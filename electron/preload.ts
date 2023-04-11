import { contextBridge, ipcRenderer } from 'electron';

const WINDOW_API = {
  createReport: (reportName: string, filePath: string) => ipcRenderer.invoke('createReport', reportName, filePath),
  getAllReports: () => ipcRenderer.invoke('getAllReports'),
};

contextBridge.exposeInMainWorld('api', WINDOW_API);
