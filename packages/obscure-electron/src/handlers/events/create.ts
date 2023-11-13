import type { Combatant, RawCombatLog, ZoneChange } from '@obscure/types';

import { parseZoneChangeEvent } from '../../parsers/zonechanged';
import CombatDB from '../../database';
import { parseCombatantInfoEvent } from 'src/parsers/combatant';

export function createZoneChange(rawCombatLog: RawCombatLog, reportGuid: string): Promise<number> {
  const conn = CombatDB.connection();
  const eventToInsert = parseZoneChangeEvent(rawCombatLog, reportGuid);

  return conn<ZoneChange>('ZonesVisited')
    .insert(eventToInsert)
    .then(rows => rows.length);
}

export function createCombatant(rawCombatLog: RawCombatLog, encounterGuid: string): Promise<number> {
  const conn = CombatDB.connection();
  const eventToInsert = parseCombatantInfoEvent(rawCombatLog, encounterGuid);

  return conn<Combatant>('Combatants')
    .insert(eventToInsert)
    .then(rows => rows.length);
}
