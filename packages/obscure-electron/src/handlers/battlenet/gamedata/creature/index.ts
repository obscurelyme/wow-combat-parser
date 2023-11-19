import { IpcMain } from 'electron';

import { fetchCreatureMediaData } from '../../../../vendors/blizzard';

export function connectBattleNetCreatureDataHandlers(ipcMain: IpcMain): void {
  ipcMain.handle('fetchCreatureMediaData', async (_, id: string) => {
    return await fetchCreatureMediaData(id);
  });
}
