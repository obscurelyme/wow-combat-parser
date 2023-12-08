import { contextBridge, ipcRenderer } from 'electron';
import type { Options } from 'open';

const WINDOW_API = {
  // BNET GAME DATA API ------------------------------------------------------------------------------------------------
  getBnetJournalInstanceData: (journalInstanceId: string) =>
    ipcRenderer.invoke('fetchJournalInstance', journalInstanceId),
  getBnetJournalEncounterData: (JournalEncounterId: string) =>
    ipcRenderer.invoke('fetchJournalEncounter', JournalEncounterId),
  getBnetCreatureMediaData: (creatureDisplayId: string) =>
    ipcRenderer.invoke('fetchCreatureMediaData', creatureDisplayId),
  // REPORT ------------------------------------------------------------------------------------------------------------
  getReport: (reportGuid: string) => ipcRenderer.invoke('getReport', reportGuid),
  createReport: (reportName: string, filePath: string, reportGuid: string) =>
    ipcRenderer.invoke('createReport', reportName, filePath, reportGuid),
  deleteReport: (reportGuid: string) => ipcRenderer.invoke('deleteReport', reportGuid),
  getAllReports: () => ipcRenderer.invoke('getAllReports'),
  getReportUploadProgress: (reportGuid: string) => ipcRenderer.invoke('getReportUploadProgress', reportGuid),
  // ENCOUNTER ---------------------------------------------------------------------------------------------------------
  getEncounter: (encounterGuid: string) => ipcRenderer.invoke('getEncounter', encounterGuid),
  getAllEncountersFromReport: (reportGuid: string) => ipcRenderer.invoke('getAllEncountersFromReport', reportGuid),
  getJournalEncounter: (dungeonEncounterId: number) => ipcRenderer.invoke('getJournalEncounter', dungeonEncounterId),
  getCombatantsFromEncounter: (encounterGuid: string) =>
    ipcRenderer.invoke('getCombatantsFromEncounter', encounterGuid),
  // BNET PROFILE HANDLERS ---------------------------------------------------------------------------------------------
  getBNetProfileAuthToken: () => ipcRenderer.invoke('getBNetProfileAuthToken'),
  userAuthenticate: (authCode: string) => ipcRenderer.invoke('userAuthenticate', authCode),
  logoutUser: () => ipcRenderer.invoke('logoutUser'),
  getUserProfile: () => ipcRenderer.invoke('getUserProfile'),
  // BNET GENERAL AUTH -------------------------------------------------------------------------------------------------
  getBNetGeneralAuthToken: () => ipcRenderer.invoke('getBNetGeneralAuthToken'),
  // OPEN APPLICATION --------------------------------------------------------------------------------------------------
  openApplication: (target: string, options: Options) => ipcRenderer.invoke('openApplication', target, options),
};

contextBridge.exposeInMainWorld('api', WINDOW_API);
