import type { Combatant, RawCombatLog, ZoneChange } from '@obscure/types';

import { parseZoneChangeEvent } from '../../parsers/zonechanged';
import CombatDB from '../../database';
import { parseCombatantInfoEvent } from '../../parsers/combatant';

export function createZoneChange(rawCombatLog: RawCombatLog, reportGuid: string): Promise<number> {
  const conn = CombatDB.connection();
  const eventToInsert = parseZoneChangeEvent(rawCombatLog, reportGuid);

  return conn<ZoneChange>('ZonesVisited')
    .insert(eventToInsert)
    .then(rows => rows.length);
}

export function createCombatant(
  rawCombatLog: RawCombatLog,
  reportGuid: string,
  encounterGuid: string
): Promise<Omit<Combatant, 'id' | 'playerName'>> {
  const conn = CombatDB.connection();
  const eventToInsert = parseCombatantInfoEvent(rawCombatLog, reportGuid, encounterGuid);

  return conn<Combatant>('Combatants')
    .insert(eventToInsert)
    .then(_ => Promise.resolve(eventToInsert));
}
