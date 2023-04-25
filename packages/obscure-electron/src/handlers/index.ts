import { ElectronError, ElectronResult, Report } from '@obscure/types';
import { IpcMainInvokeEvent } from 'electron';

import { FileReader } from '../filereader';

function buildElectronResponse<T>(data?: T, error?: ElectronError): ElectronResult<T> {
  if (data) {
    return {
      data,
      error: error?.serialize(),
    };
  }
  return {
    error,
  };
}

export async function createReport(
  event: IpcMainInvokeEvent,
  reportName: string,
  filePath: string
): Promise<ElectronResult<Report>> {
  console.log(`Processing event: `, event);
  const fileReader = new FileReader();
  try {
    const valid = await fileReader.validate(filePath);
    if (valid) {
      const contents = await fileReader.read(reportName, filePath);
      return buildElectronResponse(contents);
    } else {
      fileReader.removeAllListeners();
      return buildElectronResponse<Report>(undefined, new ElectronError('Invalid File'));
    }
  } catch (e) {
    return buildElectronResponse<Report>(
      undefined,
      new ElectronError({
        ...(e as Error),
      })
    );
  }
}
