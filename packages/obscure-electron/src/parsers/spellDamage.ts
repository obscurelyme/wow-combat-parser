import { RawCombatLog, SpellDamageEvent, SpellSchool } from '@obscure/types';

import { baseParams, advancedParams, prefixParams } from './utils';

/**
 * Create suffix params for SWING_DAMAGE, SPELL_DAMAGE, SPELL_HEAL, SPELL_PERIODIC_DAMAGE, and SPELL_PERIODIC_HEAL events
 * @param params
 * @returns
 */
function suffixParams(params: string[]) {
  return {
    amount: parseInt(params[0]),
    baseAmount: parseInt(params[1]),
    overkill: parseInt(params[2]),
    school: parseInt(params[3]),
    resisted: parseInt(params[4]),
    blocked: parseInt(params[5]),
    absorbed: parseInt(params[6]),

    critical: params[7] == 'nil' ? false : !!parseInt(params[7]),
    glancing: params[8] == 'nil' ? false : !!parseInt(params[8]),
    crushing: params[9] == 'nil' ? false : !!parseInt(params[9]),
    isOffHand: params[10] == 'nil' || params[10] == undefined ? false : !!parseInt(params[10]),
  };
}

export function parseSpellDamageEvent(combatLog: RawCombatLog): SpellDamageEvent {
  const args = combatLog.params.split('|');

  const base = baseParams(args.splice(0, 8));
  let prefix = {
    spellId: 0,
    spellName: 'Melee Swing',
    spellSchool: SpellSchool.Physical,
  };
  if (!combatLog.subevent.includes('SWING')) {
    prefix = prefixParams(args.splice(0, 3));
  }
  const adv = advancedParams(args.splice(0, 17));
  const suffix = suffixParams(args);

  const s: SpellDamageEvent = {
    timestamp: combatLog.timestamp,
    guid: combatLog.id,
    // Base Params
    ...base,
    // Prefix Params
    ...prefix,
    // Advanced Params
    ...adv,
    // Suffix Params
    ...suffix,
    supportPlayerGuid: args[10],
    reportGuid: '',
    encounterGuid: '',
  };

  return s;
}
