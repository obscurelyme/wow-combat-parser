import { AdvancedParams, RawCombatLog, SpellDamageEvent, SpellSchool } from '@obscure/types';

function baseParams(params: string[]) {
  return {
    sourceGuid: params[0],
    sourceName: params[1],
    sourceFlags: parseInt(params[2]),
    sourceRaidFlags: parseInt(params[3]),
    destGuid: params[4],
    destName: params[5],
    destFlags: parseInt(params[6]),
    destRaidFlags: parseInt(params[7]),
  };
}

function prefixParams(params: string[]) {
  return {
    spellId: parseInt(params[0]),
    spellName: params[1],
    spellSchool: parseInt(params[2]),
  };
}

function advancedParams(params: string[]): AdvancedParams {
  return {
    infoGUID: params[0],
    ownerGUID: params[1],
    currentHP: parseInt(params[2]),
    maxHP: parseInt(params[3]),
    attackPower: parseInt(params[4]),
    spellPower: parseInt(params[5]),
    armor: parseInt(params[6]),
    absorb: parseInt(params[7]),
    powerType: parseInt(params[8]),
    currentPower: parseInt(params[9]),
    maxPower: parseInt(params[10]),
    powerCost: parseInt(params[11]),
    positionX: parseInt(params[12]),
    positionY: parseInt(params[13]),
    uiMapID: parseInt(params[14]),
    facing: parseInt(params[15]),
    level: parseInt(params[16]),
  };
}

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
  // const prefix = prefixParams(args.splice(0, 3));
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
  };

  return s;
}
