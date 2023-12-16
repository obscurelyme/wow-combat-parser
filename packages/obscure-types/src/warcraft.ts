export enum WarcraftClass {
  Unknown = 99,
  DeathKnight,
  DemonHunter,
  Druid,
  Evoker,
  Hunter,
  Mage,
  Monk,
  Paladin,
  Priest,
  Rogue,
  Shaman,
  Warlock,
  Warrior,
}

export enum WarcraftClassSpecialization {
  BloodDeathKnight = 250,
  FrostDeathKnight = 251,
  UnholyDeathKnight = 252,
  HavocDemonHunter = 577,
  VengeanceDemonHunter = 581,
  BalanceDruid = 102,
  FeralDruid = 103,
  GuardianDruid = 104,
  RestorationDruid = 105,
  AugmentationEvoker = 1473,
  DevastationEvoker = 1467,
  PreservationEvoker = 1468,
  BeastMasteryHunter = 253,
  MarksmanshipHunter = 254,
  SurvivalHunter = 255,
  ArcaneMage = 62,
  FireMage = 63,
  FrostMage = 64,
  BrewmasterMonk = 268,
  MistweaverMonk = 270,
  WindwalkerMonk = 269,
  HolyPaladin = 65,
  ProtectionPaladin = 66,
  RetributionPaladin = 70,
  DisciplinePriest = 256,
  HolyPriest = 257,
  ShadowPriest = 258,
  AssassinationRogue = 259,
  OutlawRogue = 260,
  SubtletyRogue = 261,
  ElementalShaman = 262,
  EnhancementShaman = 263,
  RestorationShaman = 264,
  AfflictionWarlock = 265,
  DemonologyWarlock = 266,
  DestructionWarlock = 267,
  ArmsWarrior = 71,
  FuryWarrior = 72,
  ProtectionWarrior = 73,
}

export enum WarcraftFaction {
  Horde,
  Alliance,
}

export enum WarcraftRace {}

export enum SpellSchool {
  Physical = 0b00000001,
  Holy = 0b00000010,
  Fire = 0b00000100,
  Nature = 0b00001000,
  Frost = 0b00010000,
  Shadow = 0b00100000,
  Arcane = 0b01000000,
  // Double Schools
  Holystrike = 0b00000011, // holy, physical
  Flamestrike = 0b00000101, // fire, physical
  Radiant = 0b00000110, // fire, holy
  Stormstrike = 0b00001001, // nature, physical
  Holystorm = 0b00001010, // nature, holy
  Volcanic = 0b00001100, // nature, fire
  Froststrike = 0b00010001, // frost, physical
  Holyfrost = 0b00010010, // holy, frost
  Frostfire = 0b00010100, // frost, fire
  Froststorm = 0b00011000, // frost, nature
  Shadowstrike = 0b00100001, // shadow, physical
  Twilight = 0b00100010, // shadow, holy
  Shadowflame = 0b00100100, // shadow, fire
  Plague = 0b00101000, // shadow, nature
  Shadowfrost = 0b00110000, // shadow, frost
  Spellstrike = 0b01000001, // arcane, physical
  Divine = 0b01000010, // arcane, holy
  Spellfire = 0b01000100, // arcane, fire
  Astral = 0b01001000, // arcane, nature
  Spellfrost = 0b01010000, // arcane, frost
  Spellshadow = 0b01100000, // arcane, shadow
  // Multi Schools
  Elemental = 0b00011100, // Frost, Nature, Fire
  Chromatic = 0b00111110, // Shadow, Frost, Nature, Fire, Holy
  Cosmic = 0b01101010, // Arcane, Shadow, Nature, Holy
  Chaos = 0b01111100, // Arcane, Shadow, Frost, Nature, Fire
  Magic = 0b01111110, // Arcane, Shadow, Frost, Nature, Fire, Holy
  ChaosExtended = 0b01111111, // 	Arcane, Shadow, Frost, Nature, Fire, Holy, Physical
}

export enum PowerType {
  HealthCost = -2,
  None,
  Mana,
  Rage,
  Focus,
  Energy,
  ComboPoints,
  Runes,
  RunicPower,
  SoulShards,
  LunarPower,
  HolyPower,
  Alternate,
  Maelstrom,
  Chi,
  Insanity,
  Obsolete,
  Obsolete2,
  ArcaneCharges,
  Fury,
  Pain,
  Essence,
  RuneBlood,
  RuneFrost,
  RuneUnholy,
  AlternateQuest,
  AlternateEncounter,
  AlternateMount,
  NumPowerTypes,
}

/**
 * Advanced parameters found in advanced combat logs, these params will be present
 * on all [PREFIX]_[SUFFIX] events
 */
export interface AdvancedParams {
  /**
   * GUID of the advanced params unit
   */
  infoGUID: string;
  /**
   * GUID of the owner in case of pets/minions
   */
  ownerGUID: string;
  /**
   * Unit current HP
   */
  currentHP: number;
  /**
   * Unit max HP
   */
  maxHP: number;
  /**
   * 	Unit attack power
   */
  attackPower: number;
  /**
   * Unit spell power
   */
  spellPower: number;
  /**
   * Unit armor
   */
  armor: number;
  /**
   * Unit applied absorb amount
   */
  absorb: number;
  powerType: PowerType;
  /**
   * Unit current power
   */
  currentPower: number;
  /**
   * Unit max power
   */
  maxPower: number;
  /**
   * Required power amount for the ability
   */
  powerCost: number;
  /**
   * Unit X position on the map instance
   */
  positionX: number;
  /**
   * Unit Y position on the map instance
   */
  positionY: number;
  uiMapID: number;
  /**
   * Unit facing direction in the [0, 2π] range
   */
  facing: number;
  /**
   * Level for NPCs, item level for players
   */
  level: number;
}
