import { Report } from './types';

export {};

declare global {
  interface Window {
    api: {
      createReport: (reportName: string, filePath: string) => Promise<Report>;
      getAllReports: () => Promise<Report[]>;
    };
  }
}

declare global {
  interface File {
    path: string;
  }
}
