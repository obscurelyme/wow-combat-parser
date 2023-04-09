import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

import { WoWEvent } from '../types';
import './styles.css';

export const workerInstance = new Worker(new URL('../sw/worker', import.meta.url), { type: 'module' });

interface FileUploadProps {
  id: string;
  name: string;
  label: string;
  onFileUploaded?: (combatLog: string) => void;
}

export default function FileUpload({ id, name, label, onFileUploaded }: FileUploadProps) {
  const [value, setValue] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleChange(event?: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const files = event?.target.files;
    if (files) {
      setValue(files[0]);
      const now = new Date().getTime();
      const data = await window.api.readFile(files[0].path);
      console.log(`File read in ${(new Date().getTime() - now) / 1000} seconds`);
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
