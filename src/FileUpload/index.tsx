import { useState } from 'react';
import { useController, UseControllerProps, FieldValues } from 'react-hook-form';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

import { WoWEvent, LogFormInput } from '../types';
import './styles.css';

export const workerInstance = new Worker(new URL('../sw/worker', import.meta.url), { type: 'module' });

interface FileUploadProps extends UseControllerProps<LogFormInput, 'combatLog'> {
  id: string;
  label: string;
  onFileUploaded?: (combatLog: string) => void;
}

export default function FileUpload({ id, label, onFileUploaded, ...rest }: FileUploadProps) {
  const [value, setValue] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { field, fieldState } = useController<LogFormInput>({ name: 'combatLog' });

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
      <Box>{/* <input {...field} /> */}</Box>
    </Box>
  );
}
