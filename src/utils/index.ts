import { v4 as uuidv4 } from 'uuid';

import { WoWEvent } from '../types';

const MAX_PARTITION_LENGTH = 1000000; // 10MB

function bufferToText(buffer: ArrayBuffer, start: number, end: number): string {
  const bufferLengthLeft = buffer.byteLength - start;
  const realEnd = end <= bufferLengthLeft ? end : bufferLengthLeft;
  const bufferUint8Array = new Uint8Array(buffer, start, realEnd);
  return new TextDecoder().decode(bufferUint8Array);
}

function parsedWoWEvent(finalDateString: string, params: string[]): WoWEvent {
  switch (params[0]) {
    case 'ENCOUNTER_START': {
      return {
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
        id: uuidv4(),
        subevent: params[0],
        zoneId: params[1],
        zoneName: params[2],
      };
    }
    case 'MAP_CHANGE': {
      return {
        id: uuidv4(),
        subevent: params[0],
        mapId: params[1],
        mapName: params[2],
      };
    }
    default: {
      return {
        timestamp: new Date(finalDateString),
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

export function readFile(file?: File): Promise<WoWEvent[]> {
  return new Promise((resolve, reject) => {
    const combatLogEventPartition: string[] = [];
    let combatLog: WoWEvent[] = [];
    const currentYear = new Date().getFullYear();

    if (file) {
      if (file.type !== 'text/plain') {
        return reject(`Invalid File Type: ${file.type} is not allowed, only "text/plain" files are allowed`);
      }
      const reader = new FileReader();

      reader.addEventListener('load', event => {
        console.log(`File read into ArrayBuffer`, new Date().getTime());
        const buffer: ArrayBuffer = event.target?.result as ArrayBuffer;
        if (buffer) {
          const bufferLength = buffer.byteLength;
          const partitionCount = Math.ceil(bufferLength / MAX_PARTITION_LENGTH);
          let current = 0;

          // NOTE: Assemble the partitions
          console.log(`Assembling partitions`, new Date().getTime());
          for (let i = 0; i < partitionCount; i++) {
            combatLogEventPartition.push(bufferToText(buffer, current, MAX_PARTITION_LENGTH));
            current += MAX_PARTITION_LENGTH;
          }
          console.log(`Partitions assembled`, new Date().getTime());

          let combineWithNextLine: string | null = null;

          console.log(`Parsing file events`, new Date().getTime());
          // NOTE: Split up the partitions based on newlines
          for (let i = 0; i < partitionCount; i++) {
            const splitPartition = combatLogEventPartition[i].split(/\r\n|\n/);
            if (combineWithNextLine) {
              splitPartition[0] = combineWithNextLine + splitPartition[0];
            }
            if (!/\r\n|\n/.test(splitPartition[splitPartition.length - 1])) {
              // NOTE: does not end in newline, save this line and don't include it in the result until we've concat with the next partition
              combineWithNextLine = splitPartition[splitPartition.length - 1];
              splitPartition.pop();
            }

            combatLog = [
              ...combatLog,
              ...splitPartition.map((s, index): WoWEvent => {
                const e = s.split('  ');
                const d = e[0].split(' ');
                d[0] += `/${currentYear}`;
                const finalDateString = d.join(' ');
                const params = e[1].match(/("[^"]*")|[^,]+/g);
                return parsedWoWEvent(finalDateString, params as string[]);
              }),
            ];
          }

          console.log(`File parsing complete`, new Date().getTime());
          return resolve(combatLog);
        }
      });
      console.log(`Starting file upload`, new Date().getTime());
      reader.readAsArrayBuffer(file);
    }
  });
}
