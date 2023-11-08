import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useSearchParams } from 'react-router-dom';

import { getBNetProfileAuthToken as getAuthToken } from '../api';

interface BNetAuthData {
  profileToken?: string;
  generalToken?: string;
}

const BNetAuthContext = React.createContext<BNetAuthData>({
  profileToken: undefined,
  generalToken: undefined,
});

export function useBNetAuth(): BNetAuthData {
  return useContext(BNetAuthContext);
}

export default function BNetAuthProvider({ children }: React.PropsWithChildren<unknown>) {
  const [authState, setAuthState] = useState<BNetAuthData>({ profileToken: undefined, generalToken: undefined });
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get('code');
  const { data, isFetched } = useQuery({
    queryKey: ['authenticate', authCode],
    queryFn: () => getAuthToken(authCode),
    staleTime: 1000 * 60 * 60,
    retry: 3,
    enabled: !!authCode,
  });

  useEffect(() => {
    if (data) {
      setAuthState({
        generalToken: authState.generalToken,
        profileToken: data.authToken,
      });
    }
  }, [data, setAuthState, authState.generalToken, isFetched]);

  return <BNetAuthContext.Provider value={authState}>{children}</BNetAuthContext.Provider>;
}
