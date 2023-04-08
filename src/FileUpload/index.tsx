import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { CombatEvent } from '../types';
import './styles.css';
import { Typography } from '@mui/material';

interface FileUploadProps {
  id: string;
  name: string;
  label: string;
  onFileUploaded?: (combatLog: CombatEvent[]) => void;
}

const MAX_PARTITION_LENGTH = 1000000; // 10MB

function bufferToText(buffer: ArrayBuffer, start: number, end: number): string {
  const bufferLengthLeft = buffer.byteLength - start;
  const realEnd = end <= bufferLengthLeft ? end : bufferLengthLeft;
  const bufferUint8Array = new Uint8Array(buffer, start, realEnd);
  return new TextDecoder().decode(bufferUint8Array);
}

function readFile(file?: File): Promise<CombatEvent[]> {
  return new Promise((resolve, reject) => {
    const combatLogEventPartition: string[] = [];
    let combatLog: CombatEvent[] = [];
    const currentYear = new Date().getFullYear();

    if (file) {
      if (file.type !== 'text/plain') {
        return reject(
          `Invalid File Type: ${file.type} is not allowed, only "text/plain" files are allowed`
        );
      }
      const reader = new FileReader();

      reader.addEventListener('load', event => {
        const buffer: ArrayBuffer = event.target?.result as ArrayBuffer;
        if (buffer) {
          const bufferLength = buffer.byteLength;
          const partitionCount = Math.ceil(bufferLength / MAX_PARTITION_LENGTH);
          let current = 0;

          // NOTE: Assemble the partitions
          for (let i = 0; i < partitionCount; i++) {
            combatLogEventPartition.push(
              bufferToText(buffer, current, MAX_PARTITION_LENGTH)
            );
            current += MAX_PARTITION_LENGTH;
          }

          let combineWithNextLine: string | null = null;

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
              ...splitPartition.map((s, index) => {
                const e = s.split('  ');
                const d = e[0].split(' ');
                d[0] += `/${currentYear}`;
                const finalDateString = d.join(' ');
                const params = e[1].split(',');
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
                };
              }),
            ];
          }

          return resolve(combatLog);
        }
      });
      reader.readAsArrayBuffer(file);
    }
  });
}

export default function FileUpload({
  id,
  name,
  label,
  onFileUploaded,
}: FileUploadProps) {
  const [value, setValue] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleChange(event?: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const files = event?.target.files;
    if (files) {
      setValue(files[0]);
      const combatLog = await readFile(files[0]);
      setLoading(false);
      onFileUploaded?.(combatLog);
    }
  }

  if (loading) {
    return (
      <Box display="flex">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex">
      <Box mr={1}>
        <label htmlFor={id}>
          <Typography variant="body2">{`${label}: ${
            value?.name ?? ''
          }`}</Typography>
        </label>
      </Box>
      <Box>
        <input
          className="hidden"
          type="file"
          id={id}
          name={name}
          accept=".txt"
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}
