import React from 'react';
import { Box, Divider } from '@mui/material';

import { Report } from '@obscure/types';

import UploadNewReport from '../../UploadNewReport';
import ReportsGrid from '../../ReportsGrid';
import { useLoaderData } from '../utils';
// import { wait } from '../../utils';

export async function loader(): Promise<Report[]> {
  // await wait(3000);
  return Promise.resolve([]);
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
