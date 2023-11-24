/**
 * This file contains general Battle Net data types
 */

export interface Link {
  self: Self;
}

export interface Self {
  href: string;
}

export interface Area {
  name: string;
  id: number;
}

export interface Category {
  type: string;
}

export interface ExpansionStub {
  key: Self;
  name: string;
  id: number;
}

export interface Media {
  key: Self;
  id: number;
}

export interface InstanceMode {
  mode: EncounterMode;
  players: number;
  is_tracked: boolean;
}

export interface EncounterMode {
  type: string;
  name: string;
}

export interface Creature {
  id: number;
  name: string;
  creature_display: Media;
}

// export interface CreatureDisplay {
//   key: Self;
//   id: number;
// }

export interface Instance {
  key: Self;
  name: string;
  id: number;
}

export type Item = Instance;

export interface Drop {
  /**
   * The item's drop id, NOT to be confused with the actual item id
   */
  id: number;
  item: Item;
}

export interface Phase {
  id: number;
  title: string;
  sections: PhaseSection[];
  body_text?: string;
}

export interface PhaseSection {
  id: number;
  title: string;
  body_text: string;
  sections?: PhaseSection[];
  creature_display?: Media;
}

export interface Asset {
  /**
   * 'tile' | 'zoom'
   */
  key: string;
  value: string;
}

export interface EncounterStub {
  /**
   * The encounter id
   */
  id: number;
  /**
   * Link to fetch more details about this encounter
   */
  key: Self;
  /**
   * Name of the encounter
   */
  name: string;
}

export interface Faction {
  type: string;
  name: string;
}

export interface Gender {
  name: string;
  type: string;
}

export interface PlayableClass {
  key: Self;
  id: number;
  name: string;
}

export interface PlayableRace {
  key: Self;
  id: number;
  name: string;
}

export interface Realm {
  id: number;
  key: Self;
  name: string;
  slug: string;
}
