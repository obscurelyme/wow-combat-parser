import { RawCombatLog } from '@obscure/types';

import { v4 as uuidv4 } from 'uuid';

const CURRENT_YEAR = new Date().getFullYear();

export function parseRawCombatLog(line: string): RawCombatLog {
  try {
    const e = line.split('  ');
    const d = e[0].split(' ');
    d[0] += `/${CURRENT_YEAR}`;
    const timestamp = new Date(d.join(' ')).getTime();
    const params = e[1].match(/("[^"]*")|[^,]+/g);

    return {
      timestamp,
      id: uuidv4(),
      subevent: params?.shift() ?? 'UNKNOWN',
      params: params?.join('|').replaceAll('"', '') ?? '',
    };
  } catch (e) {
    console.error(e, line);
    return {
      timestamp: 0,
      id: '',
      subevent: 'UNKNOWN',
      params: '',
    };
  }
}
