import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRevalidator } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';

import { createReport } from '../api';
import { LogFormInput } from '../types';
import FileInput from '../FileInput';
import TextInput from '../TextInput';
import { toast } from '../Snackbar';

export default function UploadNewReport(): React.ReactElement {
  const revalidator = useRevalidator();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<LogFormInput>({
    defaultValues: {
      reportName: '',
      combatLog: null,
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LogFormInput> = async data => {
    try {
      if (data.reportName && data.combatLog?.path) {
        reset({
          reportName: '',
          combatLog: null,
        });
        const report = await createReport(data.reportName, data.combatLog.path);
        if (report.error) {
          throw report.error;
        }
        toast.fire({
          severity: 'success',
          message: `${report.data?.name} uploaded`,
        });
        revalidator.revalidate();
        return;
      }
      throw new Error('Invalid form data');
    } catch (e) {
      toast.fire({
        severity: 'error',
        message: (e as Error).message ?? '',
      });
    }
  };

  return (
    <Box py={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={1}>
          <Typography variant="h5">Upload a report</Typography>
        </Box>
        <Box mb={1}>
          <TextInput
            control={control}
            id="reportName"
            name="reportName"
            rules={{ required: true }}
            label="Report name"
          />
        </Box>
        <Box mb={1}>
          <FileInput
            control={control}
            name="combatLog"
            rules={{
              required: true,
              validate: {
                fileType: value => {
                  if (value instanceof File) {
                    return value.type === 'text/plain';
                  }
                  return false;
                },
                maxFileSize: value => {
                  if (value instanceof File) {
                    // NOTE: convert to GBs and see if less than 2.5
                    return value?.size / 1000 / 1000 / 1000 < 2.5;
                  }
                  // NOTE: if we are here, this is definitely an invalid value
                  return false;
                },
              },
            }}
            id="myFile"
            accept=".txt"
          />
        </Box>
        <Box display="flex">
          <Box mr={2}>
            <LoadingButton
              onClick={() => {
                reset({
                  reportName: '',
                  combatLog: null,
                });
              }}
              variant="outlined"
              disabled={isSubmitting}>
              Cancel
            </LoadingButton>
          </Box>
          <Box>
            <LoadingButton type="submit" loading={isSubmitting} variant="outlined">
              Submit
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
