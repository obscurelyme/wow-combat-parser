import { IpcMain } from 'electron';

import { fetchJournalInstance, fetchJournalEncounter } from '../../../../vendors/blizzard';

export function connectBattleNetJournalDataHandlers(ipcMain: IpcMain): void {
  ipcMain.handle('fetchJournalInstance', async (_, id: string) => {
    return await fetchJournalInstance(id);
  });
  ipcMain.handle('fetchJournalEncounter', async (_, id: string) => {
    return await fetchJournalEncounter(id);
  });
}
