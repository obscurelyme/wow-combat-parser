import { CombatLogVersion, RawCombatLog } from '@obscure/types';

export function parseCombatLogVersionEvent(rawCombatLog: RawCombatLog): CombatLogVersion {
  const args = rawCombatLog.params.split('|');

  return {
    timestamp: rawCombatLog.timestamp,
    version: parseInt(args[0], 10),
    advancedLoggingEnabled: args[2] === '1',
    buildVersion: args[4],
    projectId: parseInt(args[6], 10),
  };
}
