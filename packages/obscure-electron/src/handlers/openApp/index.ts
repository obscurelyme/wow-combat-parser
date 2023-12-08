import { IpcMain } from 'electron';
import type { ChildProcess } from 'child_process';

import openAppService, { Options } from '../../vendors/open';

function openApplication(target: string, options?: Options): Promise<ChildProcess> {
  return openAppService.open(target, options);
}

export function connectOpenAppHandlers(ipcMain: IpcMain): void {
  ipcMain.handle('openApplication', async (_, target: string, options?: Options) => {
    await openApplication(target, options);
    return;
  });
}
