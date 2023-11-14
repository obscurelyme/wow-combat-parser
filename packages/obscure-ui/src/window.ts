import { AuthToken, ElectronResult, Encounter, JournalEncounter, Report } from './types';

export {};

declare global {
  interface Window {
    api: {
      createReport: (reportName: string, filePath: string, reportGuid: string) => Promise<ElectronResult<Report>>;
      deleteReport: (reportGuid: string) => Promise<ElectronResult<unknown>>;
      getAllReports: () => Promise<Report[]>;
      getReport: (reportGuid: string) => Promise<Report>;
      getAllEncountersFromReport: (reportGuid: string) => Promise<Encounter[]>;
      getBNetProfileAuthToken: (authCode: string) => Promise<AuthToken>;
      getBNetGeneralAuthToken: () => Promise<AuthToken>;
      getJournalEncounter: (dungeonEncounterId: number) => Promise<JournalEncounter>;
      getReportUploadProgress: (reportGuid: string) => Promise<number>;
    };
  }
}

declare global {
  interface File {
    path: string;
  }
}
