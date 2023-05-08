import { ElectronError, ElectronResult } from '@obscure/types';

export function buildElectronResponse<T>(data?: T, error?: ElectronError): ElectronResult<T> {
  if (data) {
    return {
      data,
    };
  }
  return {
    error: error?.serialize(),
  };
}
