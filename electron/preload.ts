import { contextBridge, ipcRenderer } from 'electron';

const WINDOW_API = {
  createReport: (reportName: string, filePath: string) => ipcRenderer.invoke('createReport', reportName, filePath),
  getAllReports: () => ipcRenderer.invoke('getAllReports'),
  getAllEncountersFromReport: (reportGuid: string) => ipcRenderer.invoke('getAllEncountersFromReport', reportGuid),
};

contextBridge.exposeInMainWorld('api', WINDOW_API);
