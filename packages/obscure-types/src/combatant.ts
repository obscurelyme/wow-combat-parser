import { WarcraftClass, WarcraftFaction, WarcraftClassSpecialization } from './warcraft';

export interface Combatant {
  guid: string;
  reportGuid: string;
  encounterGuid: string;
  timestamp: number;
  playerGuid: string;
  faction: WarcraftFaction;
  strength: number;
  agility: number;
  stamina: number;
  intellect: number;
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
