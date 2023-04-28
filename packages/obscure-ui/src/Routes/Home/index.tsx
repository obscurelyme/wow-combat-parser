import React from 'react';
import { Box, Divider } from '@mui/material';

import { Report } from '@obscure/types';

import UploadNewReport from '../../UploadNewReport';
import ReportsGrid from '../../ReportsGrid';
import { useLoaderData } from '../utils';
import { getAllReports } from '../../api/index';

export async function loader(): Promise<Report[]> {
  const reports = await getAllReports();
  return reports;
}

export default function HomePage(): React.ReactElement {
  const reports = useLoaderData<Report[]>();

  return (
    <>
      <UploadNewReport />
      <Divider />
      <Box mt={2}>
        <ReportsGrid reports={reports} />
      </Box>
    </>
  );
}
