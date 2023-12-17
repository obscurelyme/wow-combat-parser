import { Encounter, Report, Combatant, CombatEvent, ZoneChange, SpellDamageEvent } from '@obscure/types';

import CombatDB from '../../database';

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
  zonesVisitedDeleted: number;
  combatantsDeleted: number;
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
    conn<ZoneChange>('ZonesVisited')
      .where({ reportGuid: guid })
      .del()
      .then(rows => Promise.resolve(rows)),
    conn<Combatant>('Combatants')
      .where({ reportGuid: guid })
      .del()
      .then(rows => Promise.resolve(rows)),
    conn<SpellDamageEvent>('ChallengeModes')
      .where({ reportGuid: guid })
      .del()
      .then(rows => Promise.resolve(rows)),
    conn<SpellDamageEvent>('SpellDamage')
      .where({ reportGuid: guid })
      .del()
      .then(rows => Promise.resolve(rows)),
  ]);

  return {
    reportsDeleted: rowsDeleted[0],
    encountersDeleted: rowsDeleted[1],
    combatEventsDeleted: rowsDeleted[2],
    zonesVisitedDeleted: rowsDeleted[3],
    combatantsDeleted: rowsDeleted[4],
  };
}
