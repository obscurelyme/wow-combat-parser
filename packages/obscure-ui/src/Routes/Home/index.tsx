import React from 'react';

import { Report } from '@obscure/types';

import UploadNewReport from '../../UploadNewReport';
import { wait } from '../../utils';

export async function loader(): Promise<Report[]> {
  await wait(3000);
  return Promise.resolve([]);
}

export default function HomePage(): React.ReactElement {
  return (
    <>
      <UploadNewReport />
    </>
  );
}
