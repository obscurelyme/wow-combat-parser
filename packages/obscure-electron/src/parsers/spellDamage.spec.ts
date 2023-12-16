import { parseRawCombatLog } from './rawcombatlog';
import { parseSpellDamageEvent } from './spellDamage';

describe('parseSpellDamageEvent', () => {
  it('should parse a SPELL_DAMAGE subevent', () => {
    const line =
      '8/5 16:56:41.357  SPELL_DAMAGE,Player-11-0E59713E,"Xaiser-Tichondrius",0x512,0x0,Creature-0-4227-1458-10547-90998-00004EDFA9,"Blightshard Shaper",0xa48,0x1,2120,"Flamestrike",0x4,Creature-0-4227-1458-10547-90998-00004EDFA9,0000000000000000,3470564,6873555,0,0,5043,0,0,3155,3155,0,2826.11,1683.83,731,4.2973,70,129013,54962,-1,4,0,0,0,1,nil,nil';
    const rawEvent = parseRawCombatLog(line);
    const { guid, timestamp, ...spellDamageEvent } = parseSpellDamageEvent(rawEvent);

    expect(guid).not.toBe(null);
    expect(timestamp).not.toBe(null);

    expect(spellDamageEvent).toStrictEqual({
      absorb: 0,
      absorbed: 0,
      amount: 129013,
      armor: 5043,
      attackPower: 0,
      baseAmount: 54962,
      blocked: 0,
      critical: true,
      crushing: false,
      currentHP: 3470564,
      currentPower: 3155,
      destFlags: 2632,
      destGuid: 'Creature-0-4227-1458-10547-90998-00004EDFA9',
      destName: 'Blightshard Shaper',
      destRaidFlags: 1,
      facing: 4,
      glancing: false,
      infoGUID: 'Creature-0-4227-1458-10547-90998-00004EDFA9',
      isOffHand: false,
      level: 70,
      maxHP: 6873555,
      maxPower: 3155,
      overkill: -1,
      ownerGUID: '0000000000000000',
      positionX: 2826,
      positionY: 1683,
      powerCost: 0,
      powerType: 0,
      resisted: 0,
      school: 4,
      sourceFlags: 1298,
      sourceGuid: 'Player-11-0E59713E',
      sourceName: 'Xaiser-Tichondrius',
      sourceRaidFlags: 0,
      spellId: 2120,
      spellName: 'Flamestrike',
      spellPower: 0,
      spellSchool: 4,
      uiMapID: 731,
    });
  });

  it('should tell me what LG is doing', () => {
    const line =
      '12/14 16:29:33.128  SPELL_DAMAGE,Player-57-0D814CC1,"Demonlg-Illidan",0x512,0x0,Creature-0-3886-1466-21833-95772-00007B9DAE,"Frenzied Nightclaw",0x10a48,0x0,222031,"Chaos Strike",0x7f,Creature-0-3886-1466-21833-95772-00007B9DAE,0000000000000000,1219,10991132,0,0,5043,0,3,100,100,0,3159.42,1870.16,733,0.8983,70,52654,17939,-1,127,0,0,0,1,nil,nil';
    const rawEvent = parseRawCombatLog(line);
    const { guid, timestamp, ...rest } = parseSpellDamageEvent(rawEvent);

    expect(guid).not.toBe(null);
    expect(timestamp).not.toBe(null);

    expect(rest.baseAmount).toBeLessThan(rest.amount);
    expect(rest.critical).toBe(true);
  });

  it("should mark LG's overkill", () => {
    const line =
      '12/14 16:31:01.395  SPELL_DAMAGE,Player-57-0D814CC1,"Demonlg-Illidan",0x512,0x0,Creature-0-3886-1466-21833-95766-0001FB9DAE,"Crazed Razorbeak",0x10a48,0x0,222031,"Chaos Strike",0x7f,Creature-0-3886-1466-21833-95766-0001FB9DAE,0000000000000000,0,17860595,0,0,5043,0,1,0,0,0,3152.20,1973.73,733,4.0459,71,20315,16823,17955,127,0,0,0,nil,nil,nil';
    const rawEvent = parseRawCombatLog(line);
    const { guid, timestamp, ...rest } = parseSpellDamageEvent(rawEvent);

    expect(guid).not.toBe(null);
    expect(timestamp).not.toBe(null);
    expect(rest.overkill).toBe(17955);
  });

  it('should parse a SPELL_PERIODIC_DAMAGE subevent', () => {
    const line =
      '12/14 16:27:54.511  SPELL_PERIODIC_DAMAGE,Player-57-0D814CC1,"Demonlg-Illidan",0x512,0x0,Player-57-0D814CC1,"Demonlg-Illidan",0x512,0x0,371070,"Rotting from Within",0x8,Player-57-0D814CC1,0000000000000000,804759,838866,14065,1423,5064,0,17,0,120,0,3240.07,1830.53,733,3.3051,482,34107,41943,-1,8,0,0,0,nil,nil,nil';

    const rawEvent = parseRawCombatLog(line);
    const { guid, timestamp, ...rest } = parseSpellDamageEvent(rawEvent);

    expect(guid).not.toBe(null);
    expect(timestamp).not.toBe(null);
    expect(rest).toStrictEqual({
      absorb: 0,
      absorbed: 0,
      amount: 34107,
      armor: 5064,
      attackPower: 14065,
      baseAmount: 41943,
      blocked: 0,
      critical: false,
      crushing: false,
      currentHP: 804759,
      currentPower: 0,
      destFlags: 1298,
      destGuid: 'Player-57-0D814CC1',
      destName: 'Demonlg-Illidan',
      destRaidFlags: 0,
      facing: 3,
      glancing: false,
      infoGUID: 'Player-57-0D814CC1',
      isOffHand: false,
      level: 482,
      maxHP: 838866,
      maxPower: 120,
      overkill: -1,
      ownerGUID: '0000000000000000',
      positionX: 3240,
      positionY: 1830,
      powerCost: 0,
      powerType: 17,
      resisted: 0,
      school: 8,
      sourceFlags: 1298,
      sourceGuid: 'Player-57-0D814CC1',
      sourceName: 'Demonlg-Illidan',
      sourceRaidFlags: 0,
      spellId: 371070,
      spellName: 'Rotting from Within',
      spellPower: 1423,
      spellSchool: 8,
      uiMapID: 733,
    });
  });

  it('should parse SWING_DAMAGE events', () => {
    const line =
      '12/14 16:31:13.416  SWING_DAMAGE,Creature-0-3886-1466-21833-95772-00017B9DAE,"Frenzied Nightclaw",0xa48,0x0,Player-61-0F40F96E,"Obscürely-Zul\'jin",0x511,0x20,Creature-0-3886-1466-21833-95772-00017B9DAE,0000000000000000,10929121,10991132,0,0,5043,0,3,100,100,0,3093.69,1939.82,733,0.2329,70,415759,897050,-1,1,0,0,0,nil,nil,nil';

    const rawEvent = parseRawCombatLog(line);
    const { guid, timestamp, ...rest } = parseSpellDamageEvent(rawEvent);

    expect(rest.spellId).toBe(0);
    expect(rest.spellName).toBe('Melee Swing');
    expect(rest.spellSchool).toBe(1);
  });
});
