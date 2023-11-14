import React, { useState } from 'react';
import { useForm, SubmitHandler, useFormState } from 'react-hook-form';
import { useRevalidator } from 'react-router-dom';
import { Box, Dialog, DialogTitle, DialogContent, Typography, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { v4 as uuid } from 'uuid';
import { useQuery } from '@tanstack/react-query';

import { createReport, getReportUploadProgress } from '../api';
import { LogFormInput } from '../types';
import FileInput from '../FileInput';
import TextInput from '../TextInput';
import { toast } from '../Snackbar';

interface UploadProgressProps {
  reportGuid: string;
  isOpen: boolean;
}

function UploadProgress({ reportGuid, isOpen }: UploadProgressProps): React.ReactElement {
  const progress = useQuery({
    queryKey: ['uploadProgress', reportGuid],
    queryFn: () => getReportUploadProgress(reportGuid),
    refetchInterval: 1000,
  });

  const currentValue = progress.data ? Math.floor(progress.data * 100) : 0;

  return (
    <Dialog
      open={isOpen}
      disableEscapeKeyDown
      onClose={() => {
        // NOTE: Block all closing events, we close this when isSubmitting is false
      }}>
      <DialogTitle>Uploading your report...</DialogTitle>
      <DialogContent>
        <Box width="100% " justifyContent="center" alignItems="center">
          <CircularProgress variant="determinate" value={currentValue} />
          <Box>
            <Typography variant="caption" component="div" color="text.secondary">{`${currentValue}%`}</Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default function UploadNewReport(): React.ReactElement {
  const revalidator = useRevalidator();
  const { handleSubmit, control, reset } = useForm<LogFormInput>({
    defaultValues: {
      reportName: '',
      combatLog: null,
    },
    mode: 'onChange',
  });
  const { isSubmitting } = useFormState({ control });
  const [reportGuid, setReportGuid] = useState<string>('');

  const onSubmit: SubmitHandler<LogFormInput> = async data => {
    try {
      if (data.reportName && data.combatLog?.path) {
        const newReportGuid = uuid();
        setReportGuid(newReportGuid);
        const report = await createReport(data.reportName, data.combatLog.path, newReportGuid);
        if (report.error) {
          throw report.error;
        }
        toast.fire({
          severity: 'success',
          message: `${report.data?.name} uploaded`,
        });
        revalidator.revalidate();
        reset({
          reportName: '',
          combatLog: null,
        });
        return;
      }
      throw new Error('Invalid form data');
    } catch (e) {
      setReportGuid('');
      toast.fire({
        severity: 'error',
        message: (e as Error).message ?? '',
      });
    }
  };

  return (
    <>
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
      <UploadProgress reportGuid={reportGuid} isOpen={isSubmitting} />
    </>
  );
}
