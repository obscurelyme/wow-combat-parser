import { parseCombatLogVersionEvent } from './combatlogversion';
import { parseRawCombatLog } from './rawcombatlog';

describe('parseCombatLogVersionEvent', () => {
  it('shoud parse a combat log version event with a given raw combat event', () => {
    const string = '11/21 12:01:34.071  COMBAT_LOG_VERSION,19,ADVANCED_LOG_ENABLED,1,BUILD_VERSION,9.1.5,PROJECT_ID,1';

    const rawEvent = parseRawCombatLog(string);
    const combatLogVersion = parseCombatLogVersionEvent(rawEvent);

    expect(combatLogVersion.advancedLoggingEnabled).toBe(true);
    expect(combatLogVersion.buildVersion).toBe('9.1.5');
    expect(combatLogVersion.projectId).toBe(1);
    expect(combatLogVersion.version).toBe(19);
  });
});
