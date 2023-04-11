import { Report } from '../types';

function makeErrorMessage(functionName: string) {
  return `Window API is not defined for "${functionName}". Either the Electron server not started, you have not defined this method, or you have not exposed this method.`;
}

export function createReport(reportName: string, filePath: string): Promise<Report> {
  if (window.api?.createReport) {
    return window.api.createReport(reportName, filePath);
  }
  return Promise.reject(makeErrorMessage('createReport'));
}

export function getAllReports(): Promise<Report[]> {
  if (window.api?.getAllReports) {
    return window.api.getAllReports();
  }
  return Promise.reject(makeErrorMessage('getAllReports'));
}

// export function getReport(guid: string): Promise<Report> {}
// export function getAllEncounters(reportGuid: string): Promise<Encounter[]> {}
// export function getEncounter(encounterId: string): Promise<Encounter> {}
