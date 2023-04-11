import { v4 as uuidv4 } from 'uuid';

import CombatDB from './database';
import { Report, Encounter, RawCombatLog } from './types';

export class ReportBuilder {
  private _reportGuid: string;
  private _currentEncounter: RawCombatLog;
  private _reportName: string;
  private _timestamp: number;

  public constructor(reportName: string) {
    this._reportGuid = uuidv4();
    this._reportName = reportName;
  }

  public getInfo(): Report {
    return {
      timestamp: this._timestamp,
      name: this._reportName,
      guid: this._reportGuid,
    };
  }

  public beginReport(timestamp: number) {
    this._timestamp = timestamp;
    // Create SQL create Report
    const conn = CombatDB.connection();
    conn<Report>('Reports')
      .insert({
        timestamp,
        name: this._reportName,
        guid: this._reportGuid,
      })
      .then(rows => {
        console.log(`${rows.length} inserted`);
      });
  }

  public assembleSQLQuery(line: RawCombatLog) {
    // TODO: assemble SQL query based on the params here.
    if (line.subevent === 'ENCOUNTER_START') {
      // Cache this new encounter
      this._currentEncounter = { ...line };
      return;
    }

    if (line.subevent === 'ENCOUNTER_END') {
      const conn = CombatDB.connection();
      // Insert the final encounter into the database
      conn<Encounter>('Encounters').insert({});
      return;
    }
    return;
  }

  // NOTE: Why is this here?
  public encounterDetected() {
    return !!this._currentEncounter;
  }
}
