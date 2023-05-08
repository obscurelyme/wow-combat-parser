import { ElectronResult, Encounter, Report } from './types';

export {};

declare global {
  interface Window {
    api: {
      createReport: (reportName: string, filePath: string) => Promise<ElectronResult<Report>>;
      deleteReport: (reportGuid: string) => Promise<ElectronResult<unknown>>;
      getAllReports: () => Promise<Report[]>;
      getAllEncountersFromReport: (reportGuid: string) => Promise<Encounter[]>;
    };
  }
}

declare global {
  interface File {
    path: string;
  }
}
