import { Encounter, Report } from './types';
import CombatDB from './database';
import { CombatEvent } from '@obscure/types';

export function getReport(guid: string): Promise<Report> {
  const conn = CombatDB.connection();

  return conn<Report>('Reports')
    .select('*')
    .where({
      guid,
    })
    .then(rows => {
      return Promise.resolve(rows[0]);
    });
}

export function getAllReports(): Promise<Report[]> {
  const conn = CombatDB.connection();

  return conn<Report>('Reports')
    .select('guid', 'name', 'timestamp', 'uploadTimestamp')
    .orderBy('uploadTimestamp', 'desc')
    .then(rows => {
      if (rows) {
        return Promise.resolve(rows);
      }
      return Promise.resolve([]);
    });
}

export async function deleteReport(guid: string): Promise<{
  reportsDeleted: number;
  encountersDeleted: number;
  combatEventsDeleted: number;
}> {
  const conn = CombatDB.connection();

  const rowsDeleted = await Promise.all([
    conn<Report>('Reports')
      .where({ guid })
      .del()
      .then(rows => Promise.resolve(rows)),
    conn<Encounter>('Encounters')
      .where({ reportGuid: guid })
      .del()
      .then(rows => Promise.resolve(rows)),
    conn<CombatEvent>('CombatEvents')
      .where({ reportGuid: guid })
      .del()
      .then(rows => Promise.resolve(rows)),
  ]);

  return {
    reportsDeleted: rowsDeleted[0],
    encountersDeleted: rowsDeleted[1],
    combatEventsDeleted: rowsDeleted[2],
  };
}
