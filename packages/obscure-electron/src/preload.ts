import { contextBridge, ipcRenderer } from 'electron';

const WINDOW_API = {
  getReport: (reportGuid: string) => ipcRenderer.invoke('getReport', reportGuid),
  createReport: (reportName: string, filePath: string, reportGuid: string) =>
    ipcRenderer.invoke('createReport', reportName, filePath, reportGuid),
  deleteReport: (reportGuid: string) => ipcRenderer.invoke('deleteReport', reportGuid),
  getAllReports: () => ipcRenderer.invoke('getAllReports'),
  getAllEncountersFromReport: (reportGuid: string) => ipcRenderer.invoke('getAllEncountersFromReport', reportGuid),
  getBNetProfileAuthToken: (authCode: string) => ipcRenderer.invoke('getBNetProfileAuthToken', authCode),
  getBNetGeneralAuthToken: () => ipcRenderer.invoke('getBNetGeneralAuthToken'),
  getJournalEncounter: (dungeonEncounterId: number) => ipcRenderer.invoke('getJournalEncounter', dungeonEncounterId),
  getReportUploadProgress: (reportGuid: string) => ipcRenderer.invoke('getReportUploadProgress', reportGuid),
};

contextBridge.exposeInMainWorld('api', WINDOW_API);
