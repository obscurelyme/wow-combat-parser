import React, { useContext, useReducer } from 'react';

import { AuthToken } from '@obscure/types';

interface BNetAuth {
  state: BNetAuthData;
  dispatch?: React.Dispatch<AuthAction>;
}

interface BNetAuthData {
  profileToken?: AuthToken;
  generalToken?: AuthToken;
}

const BNetAuthContext = React.createContext<BNetAuth>({
  state: {
    profileToken: undefined,
    generalToken: undefined,
  },
  dispatch: undefined,
});

export function useBNetAuth(): BNetAuth {
  return useContext(BNetAuthContext);
}

interface BNetAuthProviderProps {
  profileToken?: AuthToken;
  generalToken: AuthToken;
}

interface LoginAction {
  type: 'login';
  token: AuthToken;
}

interface LogoutAction {
  type: 'logout';
}

type AuthAction = LoginAction | LogoutAction;

function authReducer(state: BNetAuthData, action: AuthAction): BNetAuthData {
  switch (action.type) {
    case 'login': {
      return {
        ...state,
      };
    }
    case 'logout': {
      return {
        ...state,
        profileToken: undefined,
      };
    }
    default: {
      return { ...state };
    }
  }
}

export default function BNetAuthProvider({
  children,
  profileToken,
  generalToken,
}: React.PropsWithChildren<BNetAuthProviderProps>) {
  const [state, dispatch] = useReducer(authReducer, { profileToken, generalToken });

  return <BNetAuthContext.Provider value={{ state, dispatch }}>{children}</BNetAuthContext.Provider>;
}
