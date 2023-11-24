import { Faction, Gender, PlayableRace, PlayableClass, Self, Realm } from './common';

export interface WowAccountCharacter {
  character: Self;
  faction: Faction;
  gender: Gender;
  id: number;
  level: number;
  name: string;
  playable_class: PlayableClass;
  playable_race: PlayableRace;
  protected_character: Self;
  realm: Realm;
}

export interface WoWAccount {
  characters: WowAccountCharacter[];
  id: number;
}

export interface UserProfile {
  wow_accounts: WoWAccount[];
}
