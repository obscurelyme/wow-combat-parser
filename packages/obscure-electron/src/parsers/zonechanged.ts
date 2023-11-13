import { RawCombatLog, ZoneChange } from '@obscure/types';

export function parseZoneChangeEvent(combatLog: RawCombatLog, reportGuid: string): Omit<ZoneChange, 'id'> {
  const args = combatLog.params.split('|');

  return {
    timestamp: combatLog.timestamp,
    reportGuid,
    guid: combatLog.id,
    instanceId: parseInt(args[0], 10),
    zoneName: args[1],
    difficultyId: parseInt(args[2], 10),
  };
}
