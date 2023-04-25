import { ElectronResult, Encounter, Report } from './types';

export {};

declare global {
  interface Window {
    api: {
      createReport: (reportName: string, filePath: string) => Promise<ElectronResult<Report>>;
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
