import { parseRawCombatLog } from './rawcombatlog';

describe('parseSpellDamageEvent', () => {
  it('should parse a SPELL_DAMAGE subevent', () => {
    const line2 =
      '8/5 16:56:41.357  SPELL_DAMAGE,Player-11-0E59713E,"Xaiser-Tichondrius",0x512,0x0,Creature-0-4227-1458-10547-90998-00004EDFA9,"Blightshard Shaper",0xa48,0x1,2120,"Flamestrike",0x4,Creature-0-4227-1458-10547-90998-00004EDFA9,0000000000000000,3470564,6873555,0,0,5043,0,0,3155,3155,0,2826.11,1683.83,731,4.2973,70,129013,54962,-1,4,0,0,0,1,nil,nil';
    const line =
      '8/5 17:35:32.691  SPELL_DAMAGE,Player-76-0B948161,"Forhiru-Sargeras",0x518,0x0,Player-76-0B948161,"Forhiru-Sargeras",0x518,0x0,406889,"Roiling Shadowflame",0x24,Player-76-0B948161,0000000000000000,686486,687440,19443,1708,10356,0,1,689,1050,0,287.64,-853.90,2112,4.9027,450,954,810,-1,36,0,0,0,1,nil,nil';
    const rawEvent = parseRawCombatLog(line);

    expect(rawEvent.params).toStrictEqual([]);
  });
});
