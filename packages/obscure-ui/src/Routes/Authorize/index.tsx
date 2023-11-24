import React from 'react';

import { Navigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Typography } from '@mui/material';

import { userAuthenticate } from '../../api';
import PageHeader from '../../Composites/PageHeader';

export default function Authorize(): React.ReactElement {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get('code');
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['authenticate', authCode],
    queryFn: () => userAuthenticate(authCode),
    staleTime: 1000 * 60 * 60,
    retry: 3,
    enabled: !!authCode,
  });

  if (data) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PageHeader title="Logging in..." />
      {isFetching && <Typography>Authenticating, please wait...</Typography>}
      {isError && (
        <>
          <Typography>Error occured while authenticating!</Typography>
          <Typography>{error.message}</Typography>
        </>
      )}
    </>
  );
}
