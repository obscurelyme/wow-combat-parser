import {
  AuthToken,
  BnetCreatureData,
  BnetJournalData,
  Combatant,
  ElectronResult,
  Encounter,
  JournalEncounter,
  Report,
} from './types';

export {};

declare global {
  interface Window {
    api: {
      // BNet Game Data API --------------------------------------------------------------------------------------------
      getBnetJournalInstanceData: (journalInstanceId: string) => Promise<BnetJournalData.JournalInstance>;
      getBnetJournalEncounterData: (JournalEncounterId: string) => Promise<BnetJournalData.JournalEncounter>;
      getBnetCreatureMediaData: (creatureDisplayId: string) => Promise<BnetCreatureData.CreatureDisplayMedia>;
      // Report --------------------------------------------------------------------------------------------------------
      createReport: (reportName: string, filePath: string, reportGuid: string) => Promise<ElectronResult<Report>>;
      deleteReport: (reportGuid: string) => Promise<ElectronResult<unknown>>;
      getAllReports: () => Promise<Report[]>;
      getReport: (reportGuid: string) => Promise<Report>;
      getAllEncountersFromReport: (reportGuid: string) => Promise<Encounter[]>;
      getReportUploadProgress: (reportGuid: string) => Promise<number>;
      // Encounter -----------------------------------------------------------------------------------------------------
      getJournalEncounter: (dungeonEncounterId: number) => Promise<JournalEncounter>;
      getEncounter: (encounterGuid: string) => Promise<Encounter>;
      getCombatantsFromEncounter: (encounterGuid: string) => Promise<Combatant[]>;
      // BNet Profile --------------------------------------------------------------------------------------------------
      getBNetProfileAuthToken: () => Promise<AuthToken | undefined>;
      userAuthenticate: (authCode: string) => Promise<AuthToken>;
      logoutUser: () => Promise<void>;
      getUserProfile: () => Promise<any>;
      // BNet General --------------------------------------------------------------------------------------------------
      getBNetGeneralAuthToken: () => Promise<AuthToken>;
    };
  }
}

declare global {
  interface File {
    path: string;
  }
}
