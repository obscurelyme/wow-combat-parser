import type { Combatant } from '@obscure/types';

import CombatDB from '../../database';

export function updateCombatant(playerName: string, playerGuid: string, encounterGuid: string): Promise<number> {
  const conn = CombatDB.connection();

  return conn<Combatant>('Combatants')
    .update({
      playerName,
    })
    .where({
      playerGuid,
      encounterGuid,
    })
    .then(rows => rows);
}
