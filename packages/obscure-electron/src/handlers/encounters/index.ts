import { IpcMain } from 'electron';

import { Combatant, Encounter, RawCombatLog } from '@obscure/types';

import CombatDB from '../../database';

/**
 * @example `2607,"Raszageth the Storm-Eater",16,20,2522`
 * @param data
 * @param reportGuid
 * @returns
 */
export function createEncounter(data: RawCombatLog, reportGuid: string): Promise<Encounter | null> {
  const conn = CombatDB.connection();
  const args = data.params.split('|');

  const newEncounter: Encounter = {
    startTime: data.timestamp,
    endTime: 0,
    wowEncounterId: parseInt(args[0], 10),
    reportGuid,
    guid: data.id,
    name: args[1],
    success: 0,
    difficultyId: parseInt(args[2], 10),
    numPlayers: parseInt(args[3], 10),
  };

  return conn<Encounter>('Encounters')
    .insert({ ...newEncounter })
    .then(
      rows => {
        if (rows.length) {
          return Promise.resolve({ ...newEncounter });
        }
        return Promise.reject(null);
      },
      reason => {
        console.error(reason);
        // NOTE: delete the report, since it's garbage
        return Promise.reject(null);
      }
    );
}

/**
 * 2607,"Raszageth the Storm-Eater",16,20,0,316427
 * @param data raw combat line read from combat log
 * @param encounterGuid the guid of the encounter to update with ENCOUNTER_END data
 * @returns
 */
export function updateEncounter(data: RawCombatLog, encounterGuid: string): Promise<boolean> {
  const conn = CombatDB.connection();
  const args = data.params.split('|');
  const success: number = parseInt(args[4], 10);
  const endTime: number = data.timestamp;

  return conn<Encounter>('Encounters')
    .update({ success: success, endTime })
    .where({ guid: encounterGuid })
    .then(
      () => {
        return Promise.resolve(true);
      },
      () => {
        return Promise.resolve(false);
      }
    );
}

export function getAllEncountersFromReport(reportGuid: string): Promise<Encounter[]> {
  const conn = CombatDB.connection();

  return conn<Encounter>('Encounters')
    .select('*')
    .where({
      reportGuid,
    })
    .then((rows: Encounter[]) => {
      if (rows) {
        return Promise.resolve(rows);
      }
      return Promise.resolve([]);
    });
}

type EncounterIds = Pick<Encounter, 'wowEncounterId'>[];

export function getAllEncounterIdsFromReport(reportGuid: string): Promise<EncounterIds> {
  const conn = CombatDB.connection();

  return conn<Encounter>('Encounters')
    .select('wowEncounterId')
    .where({
      reportGuid,
    })
    .then(rows => {
      if (rows.length) {
        return rows.map(row => ({ wowEncounterId: row.wowEncounterId }));
      }
      return [];
    });
}

export function getEncounter(encounterGuid: string): Promise<Encounter | null> {
  const conn = CombatDB.connection();

  return conn<Encounter>('Encounters')
    .select('*')
    .where({ guid: encounterGuid })
    .then((rows: Encounter[]) => {
      if (rows) {
        return Promise.resolve(rows[0]);
      }
      return Promise.resolve(null);
    });
}

export function getCombatantsFromEncounter(encounterGuid: string): Promise<Combatant[]> {
  const conn = CombatDB.connection();

  return conn<Combatant>('Combatants')
    .select('*')
    .where({ encounterGuid })
    .then(rows => rows);
}

export function connectEncounterHandlers(ipcMain: IpcMain): void {
  ipcMain.handle('getEncounter', async (_, encounterGuid: string) => {
    return await getEncounter(encounterGuid);
  });
  ipcMain.handle('getCombatantsFromEncounter', async (_, encounterGuid: string) => {
    return await getCombatantsFromEncounter(encounterGuid);
  });
}
