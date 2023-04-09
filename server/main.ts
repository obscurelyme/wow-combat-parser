import * as fs from 'fs';
import * as readline from 'readline';
import path from 'path';

import { v4 as uuidv4 } from 'uuid';

import { CompactWoWEvent, WoWEvent } from './types';

const combatLog: WoWEvent[] = [];
const compactEventLog: CompactWoWEvent[] = [];
const stringEventLog: string[] = [];

function bufferToText(buffer: ArrayBuffer, start: number, end: number): string {
  const bufferLengthLeft = buffer.byteLength - start;
  const realEnd = end <= bufferLengthLeft ? end : bufferLengthLeft;
  const bufferUint8Array = new Uint8Array(buffer, start, realEnd);
  return new TextDecoder().decode(bufferUint8Array);
}

function parsedWoWEvent(timestamp: number, params: string[]): WoWEvent {
  switch (params[0]) {
    case 'ENCOUNTER_START': {
      return {
        timestamp: timestamp,
        id: uuidv4(),
        subevent: params[0],
        encounterID: parseInt(params[1], 10),
        encounterName: params[2]?.replaceAll('"', ''),
        difficultyId: parseInt(params[3], 10),
        groupSize: parseInt(params[4], 10),
      };
    }
    case 'ENCOUNTER_END': {
      return {
        timestamp: timestamp,
        id: uuidv4(),
        subevent: params[0],
        encounterID: parseInt(params[1], 10),
        encounterName: params[2]?.replaceAll('"', ''),
        difficultyId: parseInt(params[3], 10),
        groupSize: parseInt(params[4], 10),
        success: params[5] === '1',
      };
    }
    case 'COMBAT_LOG_VERSION': {
      // COMBAT_LOG_VERSION,20,ADVANCED_LOG_ENABLED,0,BUILD_VERSION,10.0.7,PROJECT_ID,1
      return {
        timestamp: timestamp,
        id: uuidv4(),
        subevent: params[0],
        version: parseInt(params[1], 10),
        advancedLogEnabled: !!params[3],
        buildVersion: params[5],
        projectId: params[7],
      };
    }
    case 'ZONE_CHANGE': {
      return {
        timestamp: timestamp,
        id: uuidv4(),
        subevent: params[0],
        zoneId: params[1],
        zoneName: params[2],
      };
    }
    case 'MAP_CHANGE': {
      return {
        timestamp: timestamp,
        id: uuidv4(),
        subevent: params[0],
        mapId: params[1],
        mapName: params[2],
      };
    }
    default: {
      return {
        timestamp: timestamp,
        id: uuidv4(),
        subevent: params[0],
        sourceGuid: params[1],
        sourceName: params[2]?.replaceAll('"', ''),
        sourceFlags: params[3],
        sourceRaidFlags: params[4],
        destGuid: params[5],
        destName: params[6]?.replaceAll('"', ''),
        destFlags: params[7],
        destRaidFlags: params[8],
        rest: [...params.slice(8)],
      } as unknown as WoWEvent;
    }
  }
}

function efficientParseEvent(timestamp: number, subevent: string, params: string[]) {
  return {
    timestamp,
    subevent,
    params: [...params],
  };
}

export async function readFile(file: string) {
  const currentYear = new Date().getFullYear();
  const readInterface = readline.createInterface({
    input: fs.createReadStream(path.join('C:\\Program Files (x86)\\World of Warcraft\\_retail_\\Logs', `${file}.txt`)),
  });
  const rightNow = new Date().getTime();
  console.log('Parsing file', new Date().getTime());

  readInterface.on('line', line => {
    const e = line.split('  ');
    const d = e[0].split(' ');
    d[0] += `/${currentYear}`;
    const timestamp = new Date(d.join(' ')).getTime();
    const params = e[1].match(/("[^"]*")|[^,]+/g);
    stringEventLog.push(line);
    // compactEventLog.push({
    //   timestamp,
    //   id: uuidv4(),
    //   subevent: params?.shift() ?? 'UNKNOWN',
    //   params: params?.join('|') ?? '',
    // });
    // combatLog.push(parsedWoWEvent(timestamp, params as string[]));
  });

  readInterface.on('close', () => {
    console.log('Done parsing file', `${(new Date().getTime() - rightNow) / 1000} seconds`);
    console.log('done');
    console.log('Memory usage: ', process.memoryUsage());

    console.log('Example event', stringEventLog[10]);
  });

  // const rightNow = new Date().getTime();
  // console.log('Parsing file', new Date().getTime());
  // for await (const line of readInterface) {
  //   const e = line.split('  ');
  //   const d = e[0].split(' ');
  //   d[0] += `/${currentYear}`;
  //   const timestamp = new Date(d.join(' ')).getTime();
  //   const params = e[1].match(/("[^"]*")|[^,]+/g);
  //   combatLog.push(parsedWoWEvent(timestamp, params as string[]));
  // }
  // console.log('Done parsing file', `${(new Date().getTime() - rightNow) / 1000} seconds`);
}

const logToRead = process.argv[2];

readFile(logToRead);
