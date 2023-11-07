import { WarcraftClassSpecialization, WarcraftFaction } from '@obscure/types';

import { parseCombatantInfoEvent } from './combatant';
import { parseRawCombatLog } from './rawcombatlog';

describe('parseCombatant', () => {
  it("should parse the combatant's general info from a raw combat log", () => {
    const combatLogString =
      '4/11 17:11:47.608  COMBATANT_INFO,Player-76-0B9B553D,1,1273,7924,17506,1798,0,0,0,4294,4294,4294,0,181,2265,2265,2265,325,3321,966,966,966,4806,253,[(79814,100513,1),(79816,100515,1),(79820,100521,1),(79821,100523,1),(79822,100524,1),(79832,100536,1),(79835,100539,1),(79904,100613,1),(79907,100617,1),(79909,100619,2),(79910,100620,1),(79912,100624,1),(79913,100625,2),(79916,100628,1),(79917,100630,1),(79919,100632,1),(79921,100634,2),(79922,100635,2),(79925,100638,1),(79926,100639,2),(79928,100641,1),(79930,100643,1),(79932,100645,2),(79933,100646,2),(79937,100650,1),(79938,100652,1),(79939,100653,2),(79942,100656,2),(79944,100658,1),(79947,100661,1),(79948,100662,2),(79949,100663,1),(79952,100666,2),(79953,100667,2),(79954,100668,1),(79955,100669,1),(79956,100670,2),(79958,100672,1),(79961,100675,1),(79964,100679,3),(79965,100680,2),(79966,100681,1),(79968,100683,1),(79935,100648,1),(79918,100631,2)],(0,0,0,0),[(200390,424,(),(7981,6652,7936,8828,1498,8767),()),(193001,418,(),(8836,8840,8902,8960,8783,8782),(192988,415,192922,415,192922,415)),(193704,421,(),(9130,7977,6652,8822,8817,9144,1643,8767),()),(0,0,(),(),()),(200387,421,(6625,0,0),(6652,8830,9130,7977,1498,8767),()),(200393,421,(),(6652,7936,9130,7977,1504),()),(200391,421,(6490,0,0),(6652,9130,7977,8827,1504),()),(200388,421,(6613,0,0),(6652,9130,7977,1504),()),(133626,415,(6574,0,0),(7977,41,7935,8822,8819,9144,8973,3294,8767),(192922,415)),(200389,421,(),(6652,9130,7977,8829,1498),()),(192999,418,(6550,0,0),(8836,8840,8902,8780),(192922,415)),(203460,424,(6550,0,0),(),(204029,424,204027,424,204000,424)),(194305,421,(),(7981,6652,1498,8767),()),(194301,421,(),(6652,7981,1498,8767),()),(133639,421,(6592,0,0),(9130,7977,6652,8822,8819,9144,3300,8767),()),(193449,418,(6528,6530,0),(8836,8840,8902),()),(0,0,(),(),()),(69209,1,(),(),())],[Player-76-0B9B553D,396092,Player-76-0BA14569,389685,Player-76-0B917B1E,21562,Player-76-0BA14569,389684,Player-76-0A181A25,1459,Player-76-0B9B553D,371172,Player-76-0B85B4E8,1126,Player-76-0B720171,6673,Player-76-0BA1E2D1,381749],8,0,0,0';

    const combatLog = parseRawCombatLog(combatLogString);
    const combatant = parseCombatantInfoEvent(combatLog);

    expect(combatant.playerGuid).toBe('Player-76-0B9B553D');
    expect(combatant.faction).toBe(WarcraftFaction.Alliance);
    expect(combatant.strength).toBe(1273);
    expect(combatant.agility).toBe(7924);
    expect(combatant.stamina).toBe(17506);
    expect(combatant.intelligence).toBe(1798);
    expect(combatant.dodge).toBe(0);
    expect(combatant.parry).toBe(0);
    expect(combatant.block).toBe(0);
    expect(combatant.critMelee).toBe(4294);
    expect(combatant.critRanged).toBe(4294);
    expect(combatant.critSpell).toBe(4294);
    expect(combatant.speed).toBe(0);
    expect(combatant.lifesteal).toBe(181);
    expect(combatant.hasteMelee).toBe(2265);
    expect(combatant.hasteRanged).toBe(2265);
    expect(combatant.hasteSpell).toBe(2265);
    expect(combatant.avoidance).toBe(325);
    expect(combatant.mastery).toBe(3321);
    expect(combatant.versatilityDamageDone).toBe(966);
    expect(combatant.versatilityHealingDone).toBe(966);
    expect(combatant.versatilityDamageTaken).toBe(966);
    expect(combatant.armor).toBe(4806);
    expect(combatant.spec).toBe(WarcraftClassSpecialization.BeastMasteryHunter);
  });
});
