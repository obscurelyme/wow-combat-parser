import { RawCombatLog, SpellHealEvent } from '@obscure/types';
import { baseParams, advancedParams, prefixParams } from './utils';

function suffixParams(params: string[]) {
  return {
    amount: parseInt(params[0]),
    baseAmount: parseInt(params[2]),
    overhealing: parseInt(params[3]),
    absorbed: parseInt(params[4]),
    critical: params[5] == 'nil' ? false : !!parseInt(params[5]),
  };
}

export function parseSpellHealEvent(combatLog: RawCombatLog): SpellHealEvent {
  const args = combatLog.params.split('|');

  const base = baseParams(args.splice(0, 8));
  const prefix = prefixParams(args.splice(0, 3));
  const advance = advancedParams(args.splice(0, 17));
  const suffix = suffixParams(args);

  return {
    guid: combatLog.id,
    timestamp: combatLog.timestamp,
    reportGuid: '',
    encounterGuid: '',
    ...base,
    ...prefix,
    ...advance,
    ...suffix,
    supportPlayerGuid: undefined,
  };
}
