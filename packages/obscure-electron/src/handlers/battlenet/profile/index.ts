import { IpcMain } from 'electron';

import { AuthToken } from '@obscure/types';

import { getAuthTokens, isAuthTokenExpired, saveTokens } from '../../../handlers/user';
import { fetchProfileAuthToken, fetchUserProfileData } from '../../../vendors/blizzard';

async function userAuthenticate(authCode: string): Promise<AuthToken> {
  const payload = await fetchProfileAuthToken(authCode);
  const newToken = {
    profileToken: payload.access_token,
    profileTokenExpireDate: new Date().getTime() + payload.expires_in * 1000,
  };
  await saveTokens(newToken);
  console.log('[IPC EVENT]=>userAuthenticate returning new valid tokens from fetch');
  return {
    token: newToken.profileToken,
    expireTimestamp: newToken.profileTokenExpireDate,
  };
}

async function getBNetProfileAuthToken(): Promise<AuthToken | undefined> {
  try {
    const token = await getAuthTokens();
    if (token.profileToken && token.profileTokenExpireDate) {
      if (isAuthTokenExpired(token.profileTokenExpireDate)) {
        console.log('[IPC EVENT]=>getBNetProfileAuthToken token was stale, please login again');
        // NOTE: return undefined in this case...because the user needs to redo the auth flow.
        return undefined;
      }

      return {
        token: token.profileToken,
        expireTimestamp: token.profileTokenExpireDate,
      };
    }
    console.log('[IPC EVENT]=>getBNetProfileAuthToken no token available, please login');
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

async function getUserProfile(): Promise<any> {
  return fetchUserProfileData();
}

export function connectBNetProfileHandlers(ipcMain: IpcMain): void {
  ipcMain.handle('userAuthenticate', async (_, authCode: string) => {
    return await userAuthenticate(authCode);
  });
  ipcMain.handle('getBNetProfileAuthToken', async () => {
    return await getBNetProfileAuthToken();
  });
  ipcMain.handle('getUserProfile', async () => {
    return await getUserProfile();
  });
}
