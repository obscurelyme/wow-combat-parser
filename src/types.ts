export * from '../globalTypes';

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

// guid: Player-3676-0AF5B8C0,
// faction: 0,
// strength: 797,
// agility: 1606,
// stamina: 18910,
// intelligence: 10018,
// dodge: 0,
// parry: 0,
// block: 0,
// critMelee: 2281,
// critRanged: 2281,
// critSpell: 2281,
// speed: 250,
// lifeSteal: 332,
// haste: 5226,
// haste: 5226,
// haste: 5226,
// avoidance: 325,
// master: 3172,
// versatility: 412,
// versatility: 412,
// versatility: 412,
// armor: 2020,
// currentSpecId: 266,
// talents: [(71918,91425,1),(71939,91427,1),(71922,91430,1),(71924,91432,2),(71927,91435,1),(71928,91436,1),(71930,91438,1),(71931,91439,1),(71936,91444,1),(71937,91445,1),(71942,91452,1),(71946,91456,1),(71947,91457,1),(71949,91460,1),(71950,91461,2),(71951,91462,1),(71952,91463,2),(71955,91466,1),(71956,91468,1),(71991,91509,1),(71992,91510,2),(71994,91512,1),(71998,91516,2),(71999,91517,1),(72002,91520,1),(72003,91521,1),(72008,91526,1),(72009,91527,2),(72012,91530,1),(72013,91531,1),(72015,91533,1),(72016,91534,1),(72017,91535,1),(72018,91536,1),(72020,91539,1),(72021,91540,1),(72022,91542,1),(72023,91543,1),(72024,91544,1),(72026,91546,1),(72027,91547,1),(72030,91550,1),(71933,91441,1),(71923,91431,2),(71925,91433,1),(71957,91469,1),(71995,91513,1),(71996,91514,2),(71997,91515,1),(93178,115461,2),(93179,115462,2),(71948,91459,1)],
// pvpTalents: (0,212628,353601,212619),
// [(200336,421,(),(6652,7936,9130,7977,8828,1495),()),(193001,418,(),(8836,8840,8902,8960,8784,8782),(192985,415,192948,415,192948,415)),(200338,421,(),(6652,8826,9130,7977,1495,8767),()),(151116,1,(),(),()),(200333,421,(6625,0,0),(41,9130,7977,8830,1498),()),(193516,418,(),(8836,8840,8902,7937),()),(200337,421,(6541,0,0),(6652,8822,9130,7977,8820,8827,1504),()),(193519,418,(6607,0,0),(8836,8840,8902),()),(109864,415,(6574,0,0),(7977,6652,7935,8822,8819,9144,8973,3300,8767),(192948,415)),(193504,418,(),(8836,8840,8902),()),(192999,418,(6556,0,0),(8836,8840,8902,8780),(192948,415)),(144114,418,(6556,0,0),(8974,7977,6652,7935,9144,3308,8767),(192948,415)),(110007,415,(),(7977,6652,9144,8973,3300,8767),()),(194301,421,(),(6652,7981,1498,8767),()),(137483,421,(6592,0,0),(9130,7977,6652,8822,8819,9144,3300,8767),()),(190511,418,(6643,0,0),(8836,8840,8902),()),(193709,421,(),(9130,7977,6652,9144,1643,8767),()),(69210,1,(),(),())],
// auras: [Player-76-0A181A25,1459,Player-76-0B917B1E,139,Player-76-0B8E4B91,381757,Player-76-0B87ED86,21562,Player-76-0B85B4E8,1126],

// PVP Stats
// honorLevel: 62,
// season: 0,
// rating: 0,
// tier: 0

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
