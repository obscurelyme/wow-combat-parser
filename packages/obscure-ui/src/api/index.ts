import { faker } from '@faker-js/faker';

import {
  AuthToken,
  ElectronResult,
  Encounter,
  Report,
  JournalEncounter,
  BnetJournalData,
  BnetCreatureData,
  Combatant,
  BNetUserProfile,
} from '@obscure/types';
import type { Options } from 'open';

function makeErrorMessage(functionName: string) {
  return `Window API is not defined for "${functionName}". Either the Electron server not started, you have not defined this method, or you have not exposed this method.`;
}

export function createReport(
  reportName: string,
  filePath: string,
  reportGuid: string
): Promise<ElectronResult<Report>> {
  if (window.api?.createReport) {
    return window.api.createReport(reportName, filePath, reportGuid);
  }
  return Promise.reject(makeErrorMessage('createReport'));
}

export function getReport(reportGuid: string): Promise<Report> {
  if (window.api?.getReport) {
    return window.api.getReport(reportGuid);
  }
  return Promise.reject(makeErrorMessage('getReport'));
}

export function getAllReports(): Promise<Report[]> {
  if (window.api?.getAllReports) {
    return window.api.getAllReports();
  }
  if (import.meta.env.MODE === 'mock') {
    return Promise.resolve([
      {
        name: faker.random.words(3),
        uploadTimestamp: faker.date.recent().getTime(),
        timestamp: faker.date.past().getTime(),
        guid: '',
      },
    ]);
  }
  return Promise.reject(makeErrorMessage('getAllReports'));
}

export function deleteReport(reportGuid: string): Promise<ElectronResult<unknown>> {
  if (window.api?.deleteReport) {
    return window.api.deleteReport(reportGuid);
  }
  return Promise.reject(makeErrorMessage('deleteReport'));
}

export function getAllEncountersFromReport(reportGuid: string): Promise<Encounter[]> {
  if (window.api?.getAllEncountersFromReport) {
    return window.api.getAllEncountersFromReport(reportGuid);
  }
  return Promise.reject(makeErrorMessage('getAllEncountersFromReport'));
}

export function getBNetProfileAuthToken(): Promise<AuthToken | undefined> {
  if (window.api?.getBNetProfileAuthToken) {
    return window.api.getBNetProfileAuthToken();
  }
  return Promise.reject(makeErrorMessage('getBNetProfileAuthToken'));
}

export function userAuthenticate(authCode: string | null): Promise<AuthToken | undefined> {
  if (window.api?.userAuthenticate) {
    if (authCode) {
      return window.api.userAuthenticate(authCode);
    }
    return Promise.reject('No auth code provided to authentication path.');
  }
  return Promise.reject(makeErrorMessage('userAuthenticate'));
}

export function getBNetGeneralAuthToken(): Promise<AuthToken> {
  if (window.api?.getBNetGeneralAuthToken) {
    return window.api.getBNetGeneralAuthToken();
  }
  return Promise.reject(makeErrorMessage('getBNetGeneralAuthToken'));
}

export function getJournalEncounter(dungeonEncounterId: number): Promise<JournalEncounter> {
  if (window.api?.getJournalEncounter) {
    return window.api.getJournalEncounter(dungeonEncounterId);
  }
  return Promise.reject(makeErrorMessage('getJournalEncounter'));
}

export function getReportUploadProgress(reportGuid: string): Promise<number> {
  if (window.api?.getReportUploadProgress) {
    return window.api.getReportUploadProgress(reportGuid);
  }
  return Promise.reject(makeErrorMessage('getReportUploadProgress'));
}

export function getBnetJournalInstanceData(journalInstanceId: string): Promise<BnetJournalData.JournalInstance> {
  if (window.api?.getBnetJournalInstanceData) {
    return window.api.getBnetJournalInstanceData(journalInstanceId);
  }
  return Promise.reject(makeErrorMessage('getBnetJournalInstanceData'));
}

export function getBnetJournalEncounterData(JournalEncounterId: string): Promise<BnetJournalData.JournalEncounter> {
  if (window.api?.getBnetJournalEncounterData) {
    return window.api.getBnetJournalEncounterData(JournalEncounterId);
  }
  return Promise.reject(makeErrorMessage('getBnetJournalEncounterData'));
}

export function getBnetCreatureMediaData(creatureDisplayId: string): Promise<BnetCreatureData.CreatureDisplayMedia> {
  if (window.api?.getBnetCreatureMediaData) {
    return window.api.getBnetCreatureMediaData(creatureDisplayId);
  }
  return Promise.reject(makeErrorMessage('getBnetCreatureMediaData'));
}

export function logoutUser(): Promise<void> {
  if (window.api.logoutUser) {
    return window.api.logoutUser();
  }
  return Promise.reject(makeErrorMessage('logoutUser'));
}

export function getUserProfile(): Promise<BNetUserProfile.UserProfile> {
  return window.api.getUserProfile();
}

export function getEncounter(encounterGuid: string): Promise<Encounter> {
  return window.api.getEncounter(encounterGuid);
}

export function getCombatantsFromEncounter(encounterGuid: string): Promise<Combatant[]> {
  return window.api.getCombatantsFromEncounter(encounterGuid);
}

export function openApplication(target: string, options?: Options): Promise<void> {
  return window.api.openApplication(target, options);
}
