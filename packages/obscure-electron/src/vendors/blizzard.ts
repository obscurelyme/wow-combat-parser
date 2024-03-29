import axios from 'axios';

import { BnetJournalData, BnetCreatureData } from '@obscure/types';

import { getAuthTokens } from '../handlers/user';

/**
 * Auth Token payload, exactly as Blizzard sends back
 */
export interface BlizzardAuthPayload {
  access_token: string;
  tokenType: string;
  /**
   * Total number of SECONDS until this token is no longer valid
   */
  expires_in: number;
  scope: string;
}

/**
 * Fetches an authorization token that will grant permissions to invoke the WoW Profile APIs
 * @see https://develop.battle.net/documentation/world-of-warcraft/profile-apis
 * @param authCode
 */
export async function fetchProfileAuthToken(authCode: string): Promise<BlizzardAuthPayload> {
  const BNET_CLIENT_ID = process.env.BNET_CLIENT_ID;
  const BNET_CLIENT_SECRET = process.env.BNET_CLIENT_SECRET;

  const { data } = await axios.post<BlizzardAuthPayload>(
    `https://oauth.battle.net/oauth/token?grant_type=authorization_code&code=${authCode}&redirect_uri=http://localhost:5173/authorize`,
    undefined,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${BNET_CLIENT_ID}:${BNET_CLIENT_SECRET}`).toString('base64')}`,
      },
    }
  );

  return data;
}

/**
 * Fetches an authorization token that will grant permissions to invoke the WoW Game Data APIs
 * @see https://develop.battle.net/documentation/world-of-warcraft/game-data-apis
 * @param authCode
 */
export async function fetchGeneralAuthToken(): Promise<BlizzardAuthPayload> {
  const BNET_CLIENT_ID = process.env.BNET_CLIENT_ID;
  const BNET_CLIENT_SECRET = process.env.BNET_CLIENT_SECRET;

  const { data } = await axios.post<BlizzardAuthPayload>(
    `https://oauth.battle.net/oauth/token`,
    {
      grant_type: 'client_credentials',
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${BNET_CLIENT_ID}:${BNET_CLIENT_SECRET}`).toString('base64')}`,
      },
    }
  );

  return data;
}

export async function fetchJournalInstance(jounalInstanceId: string): Promise<BnetJournalData.JournalInstance> {
  const { generalToken } = await getAuthTokens();

  const { data } = await axios.get<BnetJournalData.JournalInstance>(
    `https://us.api.blizzard.com/data/wow/journal-instance/${jounalInstanceId}`,
    {
      params: {
        region: 'us',
        namespace: 'static-us',
        locale: 'en_US',
        access_token: generalToken,
      },
    }
  );

  return data;
}

export async function fetchJournalEncounter(jounalEncounterId: string): Promise<BnetJournalData.JournalEncounter> {
  const { generalToken } = await getAuthTokens();

  const { data } = await axios.get<BnetJournalData.JournalEncounter>(
    `https://us.api.blizzard.com/data/wow/journal-encounter/${jounalEncounterId}`,
    {
      params: {
        region: 'us',
        namespace: 'static-us',
        locale: 'en_US',
        access_token: generalToken,
      },
    }
  );

  return data;
}

export async function fetchCreatureMediaData(
  creatureDisplayId: string
): Promise<BnetCreatureData.CreatureDisplayMedia> {
  const { generalToken } = await getAuthTokens();

  const { data } = await axios.get<BnetCreatureData.CreatureDisplayMedia>(
    `https://us.api.blizzard.com/data/wow/media/creature-display/${creatureDisplayId}`,
    {
      params: {
        region: 'us',
        namespace: 'static-us',
        locale: 'en_US',
        access_token: generalToken,
      },
    }
  );

  return data;
}

export async function fetchUserProfileData(): Promise<any> {
  const { profileToken } = await getAuthTokens();

  const basePath = 'https://us.api.blizzard.com';
  const endPoint = '/profile/user/wow';

  const { data } = await axios.get(`${basePath}${endPoint}`, {
    params: {
      region: 'us',
      locale: 'en_US',
      namespace: 'profile-us',
      access_token: profileToken,
    },
  });

  return data;
}
