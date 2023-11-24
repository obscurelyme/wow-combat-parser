import React, { useContext, useState } from 'react';

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
  profileToken?: AuthToken;
  generalToken: AuthToken;
}

export default function BNetAuthProvider({
  children,
  profileToken,
  generalToken,
}: React.PropsWithChildren<BNetAuthProviderProps>) {
  const [authState] = useState<BNetAuthData>({ profileToken, generalToken });

  return <BNetAuthContext.Provider value={authState}>{children}</BNetAuthContext.Provider>;
}
