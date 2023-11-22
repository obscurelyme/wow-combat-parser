export * from '@obscure/types';

export interface LogFormInput {
  reportName: string | null;
  combatLog: File | null;
}

export interface BaseParams {
  timestamp: Date;
  id: string;
  subevent: string;
  sourceGuid: string;
  sourceName: string;
  sourceFlags: string;
  sourceRaidFlags: string;
  destGuid: string;
  destName: string;
  destFlags: string;
  destRaidFlags: string;
}

export interface PrefixParams {
  spellId: string;
  spellName: string;
  spellSchool: string;
}

export interface AdvancedParams {
  infoGuid: string;
  ownerGuid: string;
  currentHp: number;
  maxHp: number;
  attackPower: number;
  spellPower: number;
  armor: number;
  absorb: number;
  powerType: number;
  currentPower: number;
  maxPower: number;
  powerCost: number;
  positionX: number;
  positionY: number;
  uiMapId: string;
  facing: number;
  level: number;
}

export interface SuffixParams {
  amount: number;
  overkill: number;
  school: number;
  resisted: null;
  blocked: null;
  absorbed: null;
  critical: boolean;
  glancing: boolean;
  crushing: boolean;
  isOffHand: boolean;
}

export interface CombatLogVersionEvent {
  id: string;
  subevent: 'COMBAT_LOG_VERSION';
  version: number;
  advancedLogEnabled: boolean;
  buildVersion: string;
  projectId: string;
}

export interface ZoneChangeEvent {
  id: string;
  subevent: 'ZONE_CHANGE';
  zoneId: string;
  zoneName: string;
}

export interface MapChangeEvent {
  id: string;
  subevent: 'MAP_CHANGE';
  mapId: string;
  mapName: string;
}

export interface EncounterStartEvent {
  id: string;
  subevent: 'ENCOUNTER_START';
  encounterID: number;
  encounterName: string;
  difficultyId: number;
  groupSize: number;
}

export interface EncounterEndEvent {
  id: string;
  subevent: 'ENCOUNTER_END';
  encounterID: number;
  encounterName: string;
  difficultyId: number;
  groupSize: number;
  success: boolean;
}

export enum Faction {
  Horde,
  Alliance,
}

export interface PvPStats {
  honorLevel: number;
  season: 0;
  rating: 0;
  tier: 0;
}

export interface InterestingAuras {
  auraId: string;
  providerGuid: string;
}

export interface MultiStat {
  melee: number;
  ranged: number;
  spell: number;
}

export interface CombatantInfoEvent {
  // Basic Player Info
  subevent: 'COMBATANT_INFO';
  playerGuid: string;
  faction: Faction;
  strength: number;
  agility: number;
  stamina: number;
  intelligence: number;
  dodge: number;
  parry: number;
  block: number;
  crit: MultiStat;
  speed: number;
  lifeSteal: number;
  haste: MultiStat;
  avoidance: number;
  master: number;
  versatility: {
    damageDone: number;
    healingDone: number;
    damageTaken: number;
  };
  armor: number;
  // Class Talents
  currentSpecId: number;
  talents: string;
  artifactTraits: string;
  equippedItems: string;
  auras: InterestingAuras[];
  pvp: PvPStats;
}

// export interface SpellDamageEvent {}

// export interface SwingDamageEvent {}

export type RawWowEvent =
  | CombatLogVersionEvent
  | ZoneChangeEvent
  | MapChangeEvent
  | EncounterStartEvent
  | EncounterEndEvent
  | CombatantInfoEvent;

export type WoWEvent =
  | CombatEvent
  | CombatLogVersionEvent
  | ZoneChangeEvent
  | MapChangeEvent
  | EncounterStartEvent
  | EncounterEndEvent
  | CombatantInfoEvent;

export interface BasicCombatEvent extends BaseParams, SuffixParams {
  subevent: SwingSubEvent | SpellSubEvent | RangeSubEvent;
  advanced: false;
}

export interface AdvancedCombatEvent extends BaseParams, AdvancedParams, SuffixParams {
  subevent: SwingSubEvent | SpellSubEvent | RangeSubEvent;
  advanced: true;
}

export type CombatEvent = BasicCombatEvent | AdvancedCombatEvent;

// export type SpecialCombatEventStrings = 'DAMAGE_SPLIT' | 'DAMAGE_SHIELD' | 'DAMAGE_SHIELD_MISSED';

// export type SubEventPrefix = 'SWING' | 'RANGE' | 'SPELL' | 'SPELL_PERIODIC' | 'SPELL_BUILDING' | 'ENVIRONMENTAL';

// export type SubEventSuffix =
//   | 'DAMAGE'
//   | 'MISSED'
//   | 'HEAL'
//   | 'HEAL_ABSORBED'
//   | 'ABSORBED'
//   | 'ENERGIZED'
//   | 'DRAIN'
//   | 'LEECH'
//   | 'INTERRUPT'
//   | 'DISPELL'
//   | 'DISPELL_FAILED'
//   | 'STOLEN'
//   | 'EXTRA_ATTACK'
//   | 'AURA_APPLIED'
//   | 'AURA_REMOVED'
//   | 'AURA_APPLIED_DOSE'
//   | 'AURA_REMOVED_DOSE'
//   | 'AURA_REFRESH'
//   | 'AURA_BROKEN'
//   | 'CAST_START'
//   | 'CAST_SUCCESS'
//   | 'CAST_FAILED'
//   | 'INSTAKILL'
//   | 'DURABILITY_DAMAGE'
//   | 'DURABILITY_DAMAGE_ALL'
//   | 'CREATE'
//   | 'SUMMON'
//   | 'RESSURECT';

// export type SubEventCombatString<Prefix extends SubEventPrefix, Suffix extends SubEventSuffix> = `${Prefix}_${Suffix}`;

export enum SwingSubEvent {
  SWING_DAMAGE = 'SWING_DAMAGE',
  SWING_MISSED = 'SWING_MISSED',
  SWING_HEAL = 'SWING_HEAL',
  SWING_HEAL_ABSORBED = 'SWING_HEAL_ABSORBED',
  SWING_ABSORBED = 'SWING_ABSORBED',
  SWING_ENERGIZED = 'SWING_ENERGIZED',
  SWING_DRAIN = 'SWING_DRAIN',
  SWING_LEECH = 'SWING_LEECH',
  SWING_INTERRUPT = 'SWING_INTERRUPT',
  SWING_DISPELL = 'SWING_DISPELL',
  SWING_DISPELL_FAILED = 'SWING_DISPELL_FAILED',
  SWING_STOLEN = 'SWING_STOLEN',
  SWING_EXTRA_ATTACK = 'SWING_EXTRA_ATTACK',
  SWING_AURA_APPLIED = 'SWING_AURA_APPLIED',
  SWING_AURA_REMOVED = 'SWING_AURA_REMOVED',
  SWING_AURA_APPLIED_DOSE = 'SWING_AURA_APPLIED_DOSE',
  SWING_AURA_REMOVED_DOSE = 'SWING_AURA_REMOVED_DOSE',
  SWING_AURA_REFRESH = 'SWING_AURA_REFRESH',
  SWING_AURA_BROKEN = 'SWING_AURA_BROKEN',
  SWING_CAST_START = 'SWING_CAST_START',
  SWING_CAST_SUCCESS = 'SWING_CAST_SUCCESS',
  SWING_CAST_FAILED = 'SWING_CAST_FAILED',
  SWING_INSTAKILL = 'SWING_INSTAKILL',
  SWING_DURABILITY_DAMAGE = 'SWING_DURABILITY_DAMAGE',
  SWING_DURABILITY_DAMAGE_ALL = 'SWING_DURABILITY_DAMAGE_ALL',
  SWING_CREATE = 'SWING_CREATE',
  SWING_SUMMON = 'SWING_SUMMON',
  SWING_RESSURECT = 'SWING_RESSURECT',
}

export enum RangeSubEvent {
  RANGE_DAMAGE = 'RANGE_DAMAGE',
  RANGE_MISSED = 'RANGE_MISSED',
  RANGE_HEAL = 'RANGE_HEAL',
  RANGE_HEAL_ABSORBED = 'RANGE_HEAL_ABSORBED',
  RANGE_ABSORBED = 'RANGE_ABSORBED',
  RANGE_ENERGIZED = 'RANGE_ENERGIZED',
  RANGE_DRAIN = 'RANGE_DRAIN',
  RANGE_LEECH = 'RANGE_LEECH',
  RANGE_INTERRUPT = 'RANGE_INTERRUPT',
  RANGE_DISPELL = 'RANGE_DISPELL',
  RANGE_DISPELL_FAILED = 'RANGE_DISPELL_FAILED',
  RANGE_STOLEN = 'RANGE_STOLEN',
  RANGE_EXTRA_ATTACK = 'RANGE_EXTRA_ATTACK',
  RANGE_AURA_APPLIED = 'RANGE_AURA_APPLIED',
  RANGE_AURA_REMOVED = 'RANGE_AURA_REMOVED',
  RANGE_AURA_APPLIED_DOSE = 'RANGE_AURA_APPLIED_DOSE',
  RANGE_AURA_REMOVED_DOSE = 'RANGE_AURA_REMOVED_DOSE',
  RANGE_AURA_REFRESH = 'RANGE_AURA_REFRESH',
  RANGE_AURA_BROKEN = 'RANGE_AURA_BROKEN',
  RANGE_CAST_START = 'RANGE_CAST_START',
  RANGE_CAST_SUCCESS = 'RANGE_CAST_SUCCESS',
  RANGE_CAST_FAILED = 'RANGE_CAST_FAILED',
  RANGE_INSTAKILL = 'RANGE_INSTAKILL',
  RANGE_DURABILITY_DAMAGE = 'RANGE_DURABILITY_DAMAGE',
  RANGE_DURABILITY_DAMAGE_ALL = 'RANGE_DURABILITY_DAMAGE_ALL',
  RANGE_CREATE = 'RANGE_CREATE',
  RANGE_SUMMON = 'RANGE_SUMMON',
  RANGE_RESSURECT = 'RANGE_RESSURECT',
}

export enum SpellSubEvent {
  SPELL_DAMAGE = 'SPELL_DAMAGE',
  SPELL_MISSED = 'SPELL_MISSED',
  SPELL_HEAL = 'SPELL_HEAL',
  SPELL_HEAL_ABSORBED = 'SPELL_HEAL_ABSORBED',
  SPELL_ABSORBED = 'SPELL_ABSORBED',
  SPELL_ENERGIZED = 'SPELL_ENERGIZED',
  SPELL_DRAIN = 'SPELL_DRAIN',
  SPELL_LEECH = 'SPELL_LEECH',
  SPELL_INTERRUPT = 'SPELL_INTERRUPT',
  SPELL_DISPELL = 'SPELL_DISPELL',
  SPELL_DISPELL_FAILED = 'SPELL_DISPELL_FAILED',
  SPELL_STOLEN = 'SPELL_STOLEN',
  SPELL_EXTRA_ATTACK = 'SPELL_EXTRA_ATTACK',
  SPELL_AURA_APPLIED = 'SPELL_AURA_APPLIED',
  SPELL_AURA_REMOVED = 'SPELL_AURA_REMOVED',
  SPELL_AURA_APPLIED_DOSE = 'SPELL_AURA_APPLIED_DOSE',
  SPELL_AURA_REMOVED_DOSE = 'SPELL_AURA_REMOVED_DOSE',
  SPELL_AURA_REFRESH = 'SPELL_AURA_REFRESH',
  SPELL_AURA_BROKEN = 'SPELL_AURA_BROKEN',
  SPELL_CAST_START = 'SPELL_CAST_START',
  SPELL_CAST_SUCCESS = 'SPELL_CAST_SUCCESS',
  SPELL_CAST_FAILED = 'SPELL_CAST_FAILED',
  SPELL_INSTAKILL = 'SPELL_INSTAKILL',
  SPELL_DURABILITY_DAMAGE = 'SPELL_DURABILITY_DAMAGE',
  SPELL_DURABILITY_DAMAGE_ALL = 'SPELL_DURABILITY_DAMAGE_ALL',
  SPELL_CREATE = 'SPELL_CREATE',
  SPELL_SUMMON = 'SPELL_SUMMON',
  SPELL_RESSURECT = 'SPELL_RESSURECT',
}

/**
 * Advanced parameters
    There can be up to 39 parameters, in order:

    9 base params (subevent, source and dest unit)
    0 to 3 prefix params (spell/environmental)
    17 advanced params
    0 to 10 suffix params
 */

type SpellDamageEvent = BaseParams & PrefixParams & AdvancedParams;
