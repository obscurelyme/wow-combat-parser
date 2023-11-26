import { RawCombatLog } from '@obscure/types';

export function parsePlayerName(log: RawCombatLog, playerGuid: string): string | null {
  const args = log.params.split('|');
  const isEventFromPlayer = args[0] === playerGuid;

  if (isEventFromPlayer) {
    return args[1];
  }

  return null;
}

export function parsePlayerInfo(log: RawCombatLog):
  | {
      playerName: string;
      playerGuid: string;
    }
  | {
      playerName: null;
      playerGuid: null;
    } {
  const args = log.params.split('|');
  const isEventFromPlayer = args[0].includes('Player-');

  if (isEventFromPlayer) {
    return { playerName: args[1], playerGuid: args[0] };
  }

  return { playerName: null, playerGuid: null };
}
