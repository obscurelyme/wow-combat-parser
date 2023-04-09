import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { WoWEvent } from '../types';
// import { workerInstance } from '../utils';
import './styles.css';
import { Typography } from '@mui/material';
import { readFile } from '../utils';

export const workerInstance = new Worker(new URL('../sw/worker', import.meta.url), { type: 'module' });

interface FileUploadProps {
  id: string;
  name: string;
  label: string;
  onFileUploaded?: (combatLog: WoWEvent[]) => void;
}

export default function FileUpload({ id, name, label, onFileUploaded }: FileUploadProps) {
  const [value, setValue] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   workerInstance.onmessage = e => {
  //     setLoading(false);
  //     onFileUploaded?.(e.data);
  //   };
  // }, []);

  async function handleChange(event?: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const files = event?.target.files;
    if (files) {
      setValue(files[0]);
      // workerInstance.postMessage(files[0]);
      const data = await readFile(files[0]);
      setLoading(false);
      onFileUploaded?.(data);
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
          <Typography variant="body2">{`${label}: ${value?.name ?? ''}`}</Typography>
        </label>
      </Box>
      <Box>
        <input className="hidden" type="file" id={id} name={name} accept=".txt" onChange={handleChange} />
      </Box>
    </Box>
  );
}
