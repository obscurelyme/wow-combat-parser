import {
  AuthToken,
  BnetCreatureData,
  BnetJournalData,
  ElectronResult,
  Encounter,
  JournalEncounter,
  Report,
} from './types';

export {};

declare global {
  interface Window {
    api: {
      createReport: (reportName: string, filePath: string, reportGuid: string) => Promise<ElectronResult<Report>>;
      deleteReport: (reportGuid: string) => Promise<ElectronResult<unknown>>;
      getAllReports: () => Promise<Report[]>;
      getReport: (reportGuid: string) => Promise<Report>;
      getAllEncountersFromReport: (reportGuid: string) => Promise<Encounter[]>;
      getBNetGeneralAuthToken: () => Promise<AuthToken>;
      getJournalEncounter: (dungeonEncounterId: number) => Promise<JournalEncounter>;
      getReportUploadProgress: (reportGuid: string) => Promise<number>;
      getBnetJournalInstanceData: (journalInstanceId: string) => Promise<BnetJournalData.JournalInstance>;
      getBnetJournalEncounterData: (JournalEncounterId: string) => Promise<BnetJournalData.JournalEncounter>;
      getBnetCreatureMediaData: (creatureDisplayId: string) => Promise<BnetCreatureData.CreatureDisplayMedia>;
      // BNet Profile --------------------------------------------------------------------------------------------------
      getBNetProfileAuthToken: () => Promise<AuthToken | undefined>;
      userAuthenticate: (authCode: string) => Promise<AuthToken>;
      logoutUser: () => Promise<void>;
      getUserProfile: () => Promise<any>;
      // ---------------------------------------------------------------------------------------------------------------
    };
  }
}

declare global {
  interface File {
    path: string;
  }
}
