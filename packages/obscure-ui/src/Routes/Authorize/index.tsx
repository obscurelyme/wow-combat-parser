import React, { useEffect } from 'react';

import { Navigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Typography } from '@mui/material';

import { userAuthenticate } from '../../api';
import PageHeader from '../../Composites/PageHeader';
import { useBNetAuth } from '../../Auth';

export default function Authorize(): React.ReactElement {
  const { state, dispatch } = useBNetAuth();
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get('code');
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['authenticate', authCode],
    queryFn: () => userAuthenticate(authCode),
    staleTime: 1000 * 60 * 60,
    retry: 3,
    enabled: !!authCode,
  });

  useEffect(() => {
    if (data) {
      dispatch?.({ type: 'login', token: data });
    }
  }, [data, dispatch]);

  if (state.profileToken) {
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
