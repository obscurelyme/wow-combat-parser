export interface RawCombatLog {
  id: string;
  timestamp: number;
  subevent: string;
  params: string;
}

export interface Encounter {
  startTime: number;
  endTime: number;
  wowEncounterId: number;
  reportGuid: string;
  guid: string;
  name: string;
  success: number;
  difficultyId: number;
  numPlayers: number;
}

export interface Report {
  uploadTimestamp: number;
  timestamp: number;
  guid: string;
  name: string;
}

export interface CombatEvent {
  subevent: string;
  timestamp: number;
  encounterGuid: string;
  reportGuid: string;
  guid: string;
  sourceGuid: string;
  sourceName: string;
  destGuid: string;
  destName: string;
  sourceFlags: number;
  sourceRaidFlags: number;
  destFlags: number;
  destRaidFlags: number;
}

export enum WarcraftRace {}

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
  VegeanceDemonHunter = 581,
  BalanceDruid = 102,
  FeralDruid = 103,
  GuardianDruid = 104,
  RestorationDruid = 105,
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

export interface Combatant {
  id: string;
  timestamp: number;
  playerGuid: string;
  faction: WarcraftFaction;
  strength: number;
  agility: number;
  stamina: number;
  intelligence: number;
  dodge: number;
  parry: number;
  block: number;
  critMelee: number;
  critRanged: number;
  critSpell: number;
  speed: number;
  lifesteal: number;
  hasteMelee: number;
  hasteRanged: number;
  hasteSpell: number;
  avoidance: number;
  mastery: number;
  versatilityDamageDone: number;
  versatilityHealingDone: number;
  versatilityDamageTaken: number;
  armor: number;
  spec: WarcraftClassSpecialization;
  talents: string;
  pvpTalents: string;
  equippedItems: string;
  interestingAuras: string;
  pvpStats: string;
  class: WarcraftClass;
}

export interface IElectronError {
  name: string;
  message: string;
  cause?: unknown;
  code?: number;
  stack?: string;
}

export class ElectronError extends Error {
  code?: number;

  public constructor(arg?: string | IElectronError | ElectronError) {
    if (arg instanceof ElectronError) {
      super(arg.message);
      this.name = 'Electron Error';
      this.stack = arg.stack;
      this.cause = arg.cause;
    } else if (typeof arg === 'string') {
      super(arg);
      this.name = 'Electron Error';
      return;
    } else {
      super(arg?.message);
      this.name = 'Electron Error';
    }
    this.code = arg?.code;
  }

  public serialize(): IElectronError {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      code: this.code,
      stack: this.stack,
    };
  }
}

export type ElectronResult<T> = {
  data?: T;
  error?: IElectronError;
};
