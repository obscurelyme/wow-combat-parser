import { Report } from './types';
import CombatDB from './database';

export function getAllReports(): Promise<Report[]> {
  const conn = CombatDB.connection();

  return conn<Report>('Reports')
    .select('guid', 'name', 'timestamp', 'uploadTimestamp')
    .orderBy('uploadTimestamp', 'desc')
    .then(rows => {
      if (rows) {
        return Promise.resolve(rows);
      }
      return Promise.resolve([]);
    });
}
