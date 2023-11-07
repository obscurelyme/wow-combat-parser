import { parseRawCombatLog } from './rawcombatlog';

describe('parseRawCombatLog', () => {
  it('should parse a line from the combat log into a raw combat log object', () => {
    const line =
      '4/11 17:11:47.456  SPELL_AURA_APPLIED,Player-76-0B8BF957,"Lushii-Sargeras",0x514,0x0,Player-76-0B8BF957,"Lushii-Sargeras",0x514,0x0,394462,"Inspired by Frost and Earth",0x1,BUFF';

    const log = parseRawCombatLog(line);

    expect(log.subevent).toBe('SPELL_AURA_APPLIED');
    expect(log.params).toBe(
      'Player-76-0B8BF957|Lushii-Sargeras|0x514|0x0|Player-76-0B8BF957|Lushii-Sargeras|0x514|0x0|394462|Inspired by Frost and Earth|0x1|BUFF'
    );
  });
});
