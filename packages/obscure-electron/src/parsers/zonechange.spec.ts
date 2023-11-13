import { zoneChange } from './zonechanged';
import { parseRawCombatLog } from './rawcombatlog';

describe('ZoneChange', () => {
  it('should parse a zone change event', () => {
    const line = '8/21 18:50:58.953  ZONE_CHANGE,2527,"Halls of Infusion",23';
    const rawEvent = parseRawCombatLog(line);

    const event = zoneChange(rawEvent);

    expect(event.guid).toBe(rawEvent.id);
    expect(event.instanceId).toBe(2527);
    expect(event.zoneName).toBe('Halls of Infusion');
    expect(event.difficultyId).toBe(23);
  });
});
