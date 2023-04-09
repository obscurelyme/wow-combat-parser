"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpellSubEvent = exports.RangeSubEvent = exports.SwingSubEvent = exports.Faction = void 0;
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
var Faction;
(function (Faction) {
    Faction[Faction["Horde"] = 0] = "Horde";
    Faction[Faction["Alliance"] = 1] = "Alliance";
})(Faction = exports.Faction || (exports.Faction = {}));
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
var SwingSubEvent;
(function (SwingSubEvent) {
    SwingSubEvent["SWING_DAMAGE"] = "SWING_DAMAGE";
    SwingSubEvent["SWING_MISSED"] = "SWING_MISSED";
    SwingSubEvent["SWING_HEAL"] = "SWING_HEAL";
    SwingSubEvent["SWING_HEAL_ABSORBED"] = "SWING_HEAL_ABSORBED";
    SwingSubEvent["SWING_ABSORBED"] = "SWING_ABSORBED";
    SwingSubEvent["SWING_ENERGIZED"] = "SWING_ENERGIZED";
    SwingSubEvent["SWING_DRAIN"] = "SWING_DRAIN";
    SwingSubEvent["SWING_LEECH"] = "SWING_LEECH";
    SwingSubEvent["SWING_INTERRUPT"] = "SWING_INTERRUPT";
    SwingSubEvent["SWING_DISPELL"] = "SWING_DISPELL";
    SwingSubEvent["SWING_DISPELL_FAILED"] = "SWING_DISPELL_FAILED";
    SwingSubEvent["SWING_STOLEN"] = "SWING_STOLEN";
    SwingSubEvent["SWING_EXTRA_ATTACK"] = "SWING_EXTRA_ATTACK";
    SwingSubEvent["SWING_AURA_APPLIED"] = "SWING_AURA_APPLIED";
    SwingSubEvent["SWING_AURA_REMOVED"] = "SWING_AURA_REMOVED";
    SwingSubEvent["SWING_AURA_APPLIED_DOSE"] = "SWING_AURA_APPLIED_DOSE";
    SwingSubEvent["SWING_AURA_REMOVED_DOSE"] = "SWING_AURA_REMOVED_DOSE";
    SwingSubEvent["SWING_AURA_REFRESH"] = "SWING_AURA_REFRESH";
    SwingSubEvent["SWING_AURA_BROKEN"] = "SWING_AURA_BROKEN";
    SwingSubEvent["SWING_CAST_START"] = "SWING_CAST_START";
    SwingSubEvent["SWING_CAST_SUCCESS"] = "SWING_CAST_SUCCESS";
    SwingSubEvent["SWING_CAST_FAILED"] = "SWING_CAST_FAILED";
    SwingSubEvent["SWING_INSTAKILL"] = "SWING_INSTAKILL";
    SwingSubEvent["SWING_DURABILITY_DAMAGE"] = "SWING_DURABILITY_DAMAGE";
    SwingSubEvent["SWING_DURABILITY_DAMAGE_ALL"] = "SWING_DURABILITY_DAMAGE_ALL";
    SwingSubEvent["SWING_CREATE"] = "SWING_CREATE";
    SwingSubEvent["SWING_SUMMON"] = "SWING_SUMMON";
    SwingSubEvent["SWING_RESSURECT"] = "SWING_RESSURECT";
})(SwingSubEvent = exports.SwingSubEvent || (exports.SwingSubEvent = {}));
var RangeSubEvent;
(function (RangeSubEvent) {
    RangeSubEvent["RANGE_DAMAGE"] = "RANGE_DAMAGE";
    RangeSubEvent["RANGE_MISSED"] = "RANGE_MISSED";
    RangeSubEvent["RANGE_HEAL"] = "RANGE_HEAL";
    RangeSubEvent["RANGE_HEAL_ABSORBED"] = "RANGE_HEAL_ABSORBED";
    RangeSubEvent["RANGE_ABSORBED"] = "RANGE_ABSORBED";
    RangeSubEvent["RANGE_ENERGIZED"] = "RANGE_ENERGIZED";
    RangeSubEvent["RANGE_DRAIN"] = "RANGE_DRAIN";
    RangeSubEvent["RANGE_LEECH"] = "RANGE_LEECH";
    RangeSubEvent["RANGE_INTERRUPT"] = "RANGE_INTERRUPT";
    RangeSubEvent["RANGE_DISPELL"] = "RANGE_DISPELL";
    RangeSubEvent["RANGE_DISPELL_FAILED"] = "RANGE_DISPELL_FAILED";
    RangeSubEvent["RANGE_STOLEN"] = "RANGE_STOLEN";
    RangeSubEvent["RANGE_EXTRA_ATTACK"] = "RANGE_EXTRA_ATTACK";
    RangeSubEvent["RANGE_AURA_APPLIED"] = "RANGE_AURA_APPLIED";
    RangeSubEvent["RANGE_AURA_REMOVED"] = "RANGE_AURA_REMOVED";
    RangeSubEvent["RANGE_AURA_APPLIED_DOSE"] = "RANGE_AURA_APPLIED_DOSE";
    RangeSubEvent["RANGE_AURA_REMOVED_DOSE"] = "RANGE_AURA_REMOVED_DOSE";
    RangeSubEvent["RANGE_AURA_REFRESH"] = "RANGE_AURA_REFRESH";
    RangeSubEvent["RANGE_AURA_BROKEN"] = "RANGE_AURA_BROKEN";
    RangeSubEvent["RANGE_CAST_START"] = "RANGE_CAST_START";
    RangeSubEvent["RANGE_CAST_SUCCESS"] = "RANGE_CAST_SUCCESS";
    RangeSubEvent["RANGE_CAST_FAILED"] = "RANGE_CAST_FAILED";
    RangeSubEvent["RANGE_INSTAKILL"] = "RANGE_INSTAKILL";
    RangeSubEvent["RANGE_DURABILITY_DAMAGE"] = "RANGE_DURABILITY_DAMAGE";
    RangeSubEvent["RANGE_DURABILITY_DAMAGE_ALL"] = "RANGE_DURABILITY_DAMAGE_ALL";
    RangeSubEvent["RANGE_CREATE"] = "RANGE_CREATE";
    RangeSubEvent["RANGE_SUMMON"] = "RANGE_SUMMON";
    RangeSubEvent["RANGE_RESSURECT"] = "RANGE_RESSURECT";
})(RangeSubEvent = exports.RangeSubEvent || (exports.RangeSubEvent = {}));
var SpellSubEvent;
(function (SpellSubEvent) {
    SpellSubEvent["SPELL_DAMAGE"] = "SPELL_DAMAGE";
    SpellSubEvent["SPELL_MISSED"] = "SPELL_MISSED";
    SpellSubEvent["SPELL_HEAL"] = "SPELL_HEAL";
    SpellSubEvent["SPELL_HEAL_ABSORBED"] = "SPELL_HEAL_ABSORBED";
    SpellSubEvent["SPELL_ABSORBED"] = "SPELL_ABSORBED";
    SpellSubEvent["SPELL_ENERGIZED"] = "SPELL_ENERGIZED";
    SpellSubEvent["SPELL_DRAIN"] = "SPELL_DRAIN";
    SpellSubEvent["SPELL_LEECH"] = "SPELL_LEECH";
    SpellSubEvent["SPELL_INTERRUPT"] = "SPELL_INTERRUPT";
    SpellSubEvent["SPELL_DISPELL"] = "SPELL_DISPELL";
    SpellSubEvent["SPELL_DISPELL_FAILED"] = "SPELL_DISPELL_FAILED";
    SpellSubEvent["SPELL_STOLEN"] = "SPELL_STOLEN";
    SpellSubEvent["SPELL_EXTRA_ATTACK"] = "SPELL_EXTRA_ATTACK";
    SpellSubEvent["SPELL_AURA_APPLIED"] = "SPELL_AURA_APPLIED";
    SpellSubEvent["SPELL_AURA_REMOVED"] = "SPELL_AURA_REMOVED";
    SpellSubEvent["SPELL_AURA_APPLIED_DOSE"] = "SPELL_AURA_APPLIED_DOSE";
    SpellSubEvent["SPELL_AURA_REMOVED_DOSE"] = "SPELL_AURA_REMOVED_DOSE";
    SpellSubEvent["SPELL_AURA_REFRESH"] = "SPELL_AURA_REFRESH";
    SpellSubEvent["SPELL_AURA_BROKEN"] = "SPELL_AURA_BROKEN";
    SpellSubEvent["SPELL_CAST_START"] = "SPELL_CAST_START";
    SpellSubEvent["SPELL_CAST_SUCCESS"] = "SPELL_CAST_SUCCESS";
    SpellSubEvent["SPELL_CAST_FAILED"] = "SPELL_CAST_FAILED";
    SpellSubEvent["SPELL_INSTAKILL"] = "SPELL_INSTAKILL";
    SpellSubEvent["SPELL_DURABILITY_DAMAGE"] = "SPELL_DURABILITY_DAMAGE";
    SpellSubEvent["SPELL_DURABILITY_DAMAGE_ALL"] = "SPELL_DURABILITY_DAMAGE_ALL";
    SpellSubEvent["SPELL_CREATE"] = "SPELL_CREATE";
    SpellSubEvent["SPELL_SUMMON"] = "SPELL_SUMMON";
    SpellSubEvent["SPELL_RESSURECT"] = "SPELL_RESSURECT";
})(SpellSubEvent = exports.SpellSubEvent || (exports.SpellSubEvent = {}));
