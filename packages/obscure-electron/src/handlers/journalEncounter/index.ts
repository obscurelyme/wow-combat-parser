import { IpcMain } from 'electron';

import { JournalEncounter } from '@obscure/types';

import CombatDB from '../../database';

/**
 * Fetches a journal encounter from a given dungeon encounter id
 * @param dungeonEncounterId id fetched from a combat log
 * @returns JournalEncounter
 */
export async function getJournalEncounter(dungeonEncounterId: number): Promise<JournalEncounter> {
  const conn = CombatDB.connection();

  return conn<JournalEncounter>('JournalEncounters')
    .select('*')
    .where({
      dungeonEncounterId,
    })
    .then(row => row[0]);
}

export function connectHandlers(ipcMain: IpcMain): void {
  ipcMain.handle('getJournalEncounter', async (_, dungeonEncounterId) => {
    return await getJournalEncounter(dungeonEncounterId);
  });
}
