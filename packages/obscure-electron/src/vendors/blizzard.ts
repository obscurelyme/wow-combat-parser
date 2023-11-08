import axios from 'axios';

const BNET_CLIENT_ID = 'f31378954e66440aaac9a4a7cd07e65e';
const BNET_CLIENT_SECRET = 'IMdrkC5WKu3FlZntrjL7fP7PTJd4QJhC';

/**
 * Auth Token payload, exactly as Blizzard sends back
 */
interface BlizzardAuthPayload {
  access_token: string;
  tokenType: string;
  expires_in: number;
  scope: string;
}

/**
 * Fetches an authorization token that will grant permissions to invoke the WoW Profile APIs
 * @see https://develop.battle.net/documentation/world-of-warcraft/profile-apis
 * @param authCode
 */
export async function fetchProfileAuthToken(authCode: string): Promise<BlizzardAuthPayload> {
  const { data } = await axios.post<BlizzardAuthPayload>(
    `https://oauth.battle.net/oauth/token?grant_type=authorization_code&code=${authCode}&redirect_uri=http://localhost:5173/`,
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
