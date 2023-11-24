import { contextBridge, ipcRenderer } from 'electron';

const WINDOW_API = {
  getReport: (reportGuid: string) => ipcRenderer.invoke('getReport', reportGuid),
  createReport: (reportName: string, filePath: string, reportGuid: string) =>
    ipcRenderer.invoke('createReport', reportName, filePath, reportGuid),
  deleteReport: (reportGuid: string) => ipcRenderer.invoke('deleteReport', reportGuid),
  getAllReports: () => ipcRenderer.invoke('getAllReports'),
  getAllEncountersFromReport: (reportGuid: string) => ipcRenderer.invoke('getAllEncountersFromReport', reportGuid),
  getBNetGeneralAuthToken: () => ipcRenderer.invoke('getBNetGeneralAuthToken'),
  getJournalEncounter: (dungeonEncounterId: number) => ipcRenderer.invoke('getJournalEncounter', dungeonEncounterId),
  getReportUploadProgress: (reportGuid: string) => ipcRenderer.invoke('getReportUploadProgress', reportGuid),
  getBnetJournalInstanceData: (journalInstanceId: string) =>
    ipcRenderer.invoke('fetchJournalInstance', journalInstanceId),
  getBnetJournalEncounterData: (JournalEncounterId: string) =>
    ipcRenderer.invoke('fetchJournalEncounter', JournalEncounterId),
  getBnetCreatureMediaData: (creatureDisplayId: string) =>
    ipcRenderer.invoke('fetchCreatureMediaData', creatureDisplayId),
  // BNET PROFILE HANDLERS ---------------------------------------------------------------------------------------------
  getBNetProfileAuthToken: () => ipcRenderer.invoke('getBNetProfileAuthToken'),
  userAuthenticate: (authCode: string) => ipcRenderer.invoke('userAuthenticate', authCode),
  logoutUser: () => ipcRenderer.invoke('logoutUser'),
  // -------------------------------------------------------------------------------------------------------------------
};

contextBridge.exposeInMainWorld('api', WINDOW_API);
