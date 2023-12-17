import { Combatant, SpellDamageEvent } from '@obscure/types';

import CombatDB from './database';
import { Report, Encounter, RawCombatLog } from './types';
import { createEncounter, updateEncounter } from './handlers/encounters';
import { createCombatant, createZoneChange } from './handlers/events/create';
import { parseSpellDamageEvent } from './parsers/spellDamage';

export class ReportBuilder {
  private _reportGuid: string;
  private _reportName: string;
  private _timestamp: number;
  private _uploadTimestamp: number;
  private _currentEncounterGuid: string;
  private _currentProgress: number;
  private _numCombatants: number;
  private _combatantMap: Map<string, Omit<Combatant, 'id' | 'playerName'>>;

  private static _builderCache: Map<string, ReportBuilder> = new Map();

  public static getReportUploadProgress(reportGuid: string): number {
    const report = ReportBuilder._builderCache.get(reportGuid);
    if (!report) {
      return 0;
    }
    return report.getProgress();
  }

  public constructor(reportName: string, reportGuid: string) {
    this._reportGuid = reportGuid;
    this._reportName = reportName;
    this._currentProgress = 0;
    this._numCombatants = 0;
    this._combatantMap = new Map();

    ReportBuilder._builderCache.set(this._reportGuid, this);
  }

  public getInfo(): Report {
    return {
      uploadTimestamp: this._uploadTimestamp,
      timestamp: this._timestamp,
      name: this._reportName,
      guid: this._reportGuid,
    };
  }

  public updateProgress(newProgress: number): void {
    this._currentProgress = newProgress;
  }

  public getProgress(): number {
    return this._currentProgress;
  }

  public beginReport(timestamp: number): Promise<void> {
    this._timestamp = timestamp;
    // Create SQL create Report
    const conn = CombatDB.connection();
    return conn<Report>('Reports')
      .insert({
        uploadTimestamp: new Date().getTime(),
        timestamp,
        name: this._reportName,
        guid: this._reportGuid,
      })
      .then(rows => {
        console.log(`${rows.length} inserted`);
      });
  }

  public async beginEncounter(line: RawCombatLog): Promise<Encounter | null> {
    const en = await createEncounter(line, this._reportGuid);
    this._currentEncounterGuid = line.id;
    this._combatantMap = new Map();
    return en;
  }

  public async endEncounter(line: RawCombatLog): Promise<boolean> {
    const oldEncounter = this._currentEncounterGuid;
    await updateEncounter(line, oldEncounter);
    this._currentEncounterGuid = '';
    console.log('========================================');
    this._combatantMap.forEach(co => {
      console.log(co.playerGuid);
    });
    console.log('========================================');
    this._combatantMap.clear();
    return true;
  }

  public async zoneChange(line: RawCombatLog): Promise<number> {
    return createZoneChange(line, this._reportGuid);
  }

  public async mapChange(line: RawCombatLog): Promise<void> {
    return Promise.resolve();
  }

  public async combatantInfo(line: RawCombatLog): Promise<Omit<Combatant, 'id' | 'playerName'>> {
    const combatant = await createCombatant(line, this._reportGuid, this._currentEncounterGuid);
    this._numCombatants++;
    this._combatantMap.set(combatant.playerGuid, combatant);

    return combatant;
  }

  public combatLog(line: RawCombatLog): SpellDamageEvent {
    const spellDamageEvent = parseSpellDamageEvent(line);
    spellDamageEvent.reportGuid = this._reportGuid;
    spellDamageEvent.encounterGuid = this._currentEncounterGuid;
    return spellDamageEvent;
  }

  public inEncounter(): boolean {
    return !!this._currentEncounterGuid;
  }

  public completeReport(): void {
    ReportBuilder._builderCache.delete(this._reportGuid);
  }

  public combatants(): Map<string, Omit<Combatant, 'id' | 'playerName'>> {
    return this._combatantMap;
  }

  public currentEncounterId(): string {
    return this._currentEncounterGuid;
  }
}
