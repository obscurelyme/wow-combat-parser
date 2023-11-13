import { ElectronError, ElectronResult, Report } from '@obscure/types';
import { IpcMainInvokeEvent } from 'electron';
import { v4 as uuid } from 'uuid';

import { FileReader } from '../filereader';
import { buildElectronResponse } from '../utils';
import { deleteReport as deleteReportUtil } from './reports';

export async function createReport(
  event: IpcMainInvokeEvent,
  reportName: string,
  filePath: string
): Promise<ElectronResult<Report>> {
  const eventGuid = uuid();
  console.log(`Processing event: `, eventGuid, event);
  const fileReader = new FileReader();
  try {
    const valid = await fileReader.validate(filePath);
    if (valid) {
      const contents = await fileReader.read(reportName, filePath);
      return buildElectronResponse(contents);
    } else {
      const err = new ElectronError('Invalid File');
      console.log(`Failed event: `, eventGuid, event, err.serialize());
      fileReader.removeAllListeners();
      return buildElectronResponse<Report>(undefined, err);
    }
  } catch (e) {
    const err = new ElectronError({
      ...(e as Error),
    });
    console.log(`Failed event: `, eventGuid, event, err.serialize());
    return buildElectronResponse<Report>(undefined, err);
  }
}

export async function deleteReport(event: IpcMainInvokeEvent, reportGuid: string) {
  try {
    const contents = await deleteReportUtil(reportGuid);
    return buildElectronResponse(contents);
  } catch (e) {
    const err = new ElectronError({ ...(e as Error) });
    return buildElectronResponse(undefined, err);
  }
}
