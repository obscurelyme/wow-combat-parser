import { RawCombatLog, ZoneChange } from '@obscure/types';

export function zoneChange(combatLog: RawCombatLog): Omit<ZoneChange, 'id'> {
  const args = combatLog.params.split('|');

  return {
    guid: combatLog.id,
    instanceId: parseInt(args[0], 10),
    zoneName: args[1],
    difficultyId: parseInt(args[2], 10),
  };
}
