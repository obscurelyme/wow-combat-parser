import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useSearchParams } from 'react-router-dom';

import { getBNetProfileAuthToken as getAuthToken } from '../api';
import { AuthToken } from '@obscure/types';

interface BNetAuthData {
  profileToken?: AuthToken;
  generalToken?: AuthToken;
}

const BNetAuthContext = React.createContext<BNetAuthData>({
  profileToken: undefined,
  generalToken: undefined,
});

export function useBNetAuth(): BNetAuthData {
  return useContext(BNetAuthContext);
}

interface BNetAuthProviderProps {
  generalToken: AuthToken;
}

export default function BNetAuthProvider({ children, generalToken }: React.PropsWithChildren<BNetAuthProviderProps>) {
  const [authState] = useState<BNetAuthData>({ profileToken: undefined, generalToken });
  // const [searchParams] = useSearchParams();
  // const authCode = searchParams.get('code');
  // const { data, isFetched } = useQuery({
  //   queryKey: ['authenticate', authCode],
  //   queryFn: () => getAuthToken(authCode),
  //   staleTime: 1000 * 60 * 60,
  //   retry: 3,
  //   enabled: !!authCode,
  // });

  // TODO: Use another way that isn't useEffect
  // useEffect(() => {
  //   if (data) {
  //     setAuthState({
  //       generalToken: authState.generalToken,
  //       profileToken: data,
  //     });
  //   }
  // }, [data, setAuthState, authState.generalToken, isFetched]);

  return <BNetAuthContext.Provider value={authState}>{children}</BNetAuthContext.Provider>;
}
