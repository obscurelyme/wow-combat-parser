import { AdvancedParams, SpellSchool } from './warcraft';

export interface SpellDamageEvent extends AdvancedParams {
  guid: string;
  timestamp: number;
  reportGuid: string;
  encounterGuid: string;
  // Base Params ///////////////////////////////////////////////////////////
  sourceGuid: string;
  sourceName: string;
  sourceFlags: number;
  sourceRaidFlags: number;
  destGuid: string;
  destName: string;
  destFlags: number;
  destRaidFlags: number;
  // Prefix Params
  spellId: number;
  spellName: string;
  spellSchool: SpellSchool;
  // Suffix Params ////////////////////////////////////////////////////////
  amount: number;
  /**
   * SWING_DAMAGE, SPELL_DAMAGE, SPELL_HEAL, SPELL_PERIODIC_DAMAGE, and SPELL_PERIODIC HEAL have an additional 2nd suffix parameter, baseAmount.
   * This is the amount before critical strike bonus, and before percent modifiers on the target,
   * including effects like damage reduction from armor, Ability demonhunter
   * empowerwards [Chaos Brand], Ability warrior
   * savageblow [Mortal Strike], etc.
   */
  baseAmount: number;
  overkill: number;
  school: number;
  resisted: number;
  blocked: number;
  absorbed: number;
  critical: boolean;
  glancing: boolean;
  crushing: boolean;
  isOffHand: boolean;
  supportPlayerGuid?: string;
}
