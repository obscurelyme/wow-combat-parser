import { faker } from '@faker-js/faker';

import { ElectronResult, Encounter, Report } from '../types';

function makeErrorMessage(functionName: string) {
  return `Window API is not defined for "${functionName}". Either the Electron server not started, you have not defined this method, or you have not exposed this method.`;
}

export function createReport(reportName: string, filePath: string): Promise<ElectronResult<Report>> {
  if (window.api?.createReport) {
    return window.api.createReport(reportName, filePath);
  }
  return Promise.reject(makeErrorMessage('createReport'));
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

// export function getReport(guid: string): Promise<Report> {}
// export function getEncounter(encounterId: string): Promise<Encounter> {}
