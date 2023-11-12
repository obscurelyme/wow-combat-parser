/**
 * Difficulty enums that map to difficultyIds according to wowwiki
 * @see https://wago.tools/db2/Difficulty
 */
export enum Difficulty {
  // PARTY
  PartyNormal = 1,
  PartyHeroic = 2,
  PartyMythicKeystone = 8,
  PartyEvent = 19,
  PartyMythic = 23,
  PartyTimewalking = 24,
  // RAID
  Raid10Player = 3,
  Raid25Player = 4,
  Raid10PlayerHeroic = 5,
  Raid25PlayerHeroic = 6,
  LegacyLFR = 7,
  Raid40Player = 9,
  RaidNormal = 14,
  RaidHeroic = 15,
  RaidMythic = 16,
  LFR = 17,
  RaidEvent = 18,
  RaidTimewalking = 33,
  // SCENARIO
  ScenarioHeroic = 11,
  ScenarioNormal = 12,
  ScenarioEvent = 20,
  WorldPVPScenario = 32,
  NormalScenario = 38,
  HeroicScenario = 39,
  MythicScenario = 40,
  PVPScenario = 45,
  // Unique Scenarios
  VisionOfNzoth = 152,
  TeamingIsland = 153,
  Torghast = 167,
  PoA_Courage = 168,
  PoA_Loyalty = 169,
  PoA_Wisdom = 170,
  PoA_Humility = 171,
  // Warfront
  NormalWarfront = 147,
  HeroicWarfront = 149,
  // PVP
  PVEPVP = 29,
  PVP = 34,
}

type DifficultyString = 
  | '5 Player, Normal' 
  | '5 Player, Heroic'
  | '5 Player, Mythic'
  | 'Mythic Keystone'
  | '5 Player, Event'
  | '5 Player, Timewalking'
  | 'PvEvP Scenario'
  | 'PvP'
  | '10 Player, Normal Raid'
  | '25 Player, Normal Raid'
  | '10 Player, Heroic Raid'
  | '25 Player, Heroic Raid'
  | 'Legacy LFR'
  | '40 Player, Raid'
  | 'Normal Raid'
  | 'Heroic Raid'
  | 'Mythic Raid'
  | 'LFR'
  | 'Event'
  | 'Timewalking Raid'
  | 'Timewalking LFR'
  | 'Misc Event';

const WOW_GAME_DIFFICULTIES: Map<Difficulty, DifficultyString> = new Map([
  [Difficulty.PartyNormal, '5 Player, Normal'],
  [Difficulty.PartyHeroic, '5 Player, Heroic'],
  [Difficulty.PartyMythic, '5 Player, Mythic'],
  [Difficulty.PartyMythicKeystone, 'Mythic Keystone'],
  [Difficulty.PartyEvent, '5 Player, Event'],
  [Difficulty.PartyTimewalking, '5 Player, Timewalking']
]);

export class WoWDifficultyMap {
  public static getString(id: Difficulty): DifficultyString {
    const returnString = WOW_GAME_DIFFICULTIES.get(id);
    if (!returnString) {
      throw new Error(`Invalid DifficultyId, "${id}", used in call to getString. No string could be returned because of this.`);
    }
    return returnString;
  }
}
