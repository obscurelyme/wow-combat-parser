import { v4 as uuidv4 } from 'uuid';

import CombatDB from './database';
import { Report, Encounter, RawCombatLog } from './types';
import { createEncounter, updateEncounter } from './handlers/encounters';
import { createCombatant, createZoneChange } from './handlers/events/create';

export class ReportBuilder {
  private _reportGuid: string;
  private _reportName: string;
  private _timestamp: number;
  private _uploadTimestamp: number;
  private _currentEncounterGuid: string;
  private _currentProgress: number;

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
    this._currentEncounterGuid = line.id;
    return await createEncounter(line, this._reportGuid);
  }

  public async endEncounter(line: RawCombatLog): Promise<boolean> {
    const oldEncounter = this._currentEncounterGuid;
    this._currentEncounterGuid = '';
    return await updateEncounter(line, oldEncounter);
  }

  public async zoneChange(line: RawCombatLog): Promise<number> {
    return createZoneChange(line, this._reportGuid);
  }

  public async mapChange(line: RawCombatLog): Promise<void> {
    return Promise.resolve();
  }

  public async combatantInfo(line: RawCombatLog): Promise<number> {
    return createCombatant(line, this._reportGuid, this._currentEncounterGuid);
  }

  public async combatLog(line: RawCombatLog): Promise<void> {
    return Promise.resolve();
  }

  public inEncounter(): boolean {
    return !!this._currentEncounterGuid;
  }

  public completeReport(): void {
    ReportBuilder._builderCache.delete(this._reportGuid);
  }
}
