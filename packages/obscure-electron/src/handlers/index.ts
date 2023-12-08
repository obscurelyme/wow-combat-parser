import { ElectronError, ElectronResult, Report } from '@obscure/types';
import { IpcMainInvokeEvent, IpcMain } from 'electron';
import { v4 as uuid } from 'uuid';

import { FileReader } from '../filereader';
import { buildElectronResponse } from '../utils';
import { deleteReport as deleteReportUtil } from './reports';
import { ReportBuilder } from '../reportbuilder';

export async function createReport(
  event: IpcMainInvokeEvent,
  reportName: string,
  filePath: string,
  reportGuid: string
): Promise<ElectronResult<Report>> {
  console.log(`Processing file upload...`);
  const fileReader = new FileReader();
  try {
    const valid = await fileReader.validate(filePath);
    if (valid) {
      const contents = await fileReader.read(reportName, filePath, reportGuid);
      return buildElectronResponse(contents);
    } else {
      const err = new ElectronError('Invalid File');
      console.log(`Failed event: `, err.serialize());
      fileReader.removeAllListeners();
      return buildElectronResponse<Report>(undefined, err);
    }
  } catch (e) {
    const err = new ElectronError({
      ...(e as Error),
    });
    console.log(`Failed event: `, err.serialize());
    return buildElectronResponse<Report>(undefined, err);
  }
}

export async function deleteReport(_: IpcMainInvokeEvent, reportGuid: string) {
  try {
    const contents = await deleteReportUtil(reportGuid);
    return buildElectronResponse(contents);
  } catch (e) {
    const err = new ElectronError({ ...(e as Error) });
    return buildElectronResponse(undefined, err);
  }
}

export function getReportUploadProgress(_: IpcMainInvokeEvent, reportGuid: string): Promise<number> {
  return Promise.resolve(ReportBuilder.getReportUploadProgress(reportGuid));
}

export function connectReportHandlers(ipcMain: IpcMain): void {
  ipcMain.handle('getReportUploadProgress', getReportUploadProgress);
  ipcMain.handle('createReport', createReport);
  ipcMain.handle('deleteReport', deleteReport);
}
