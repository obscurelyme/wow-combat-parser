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

export interface Expansion {
  key: Self;
  name: string;
  id: number;
}

export interface Media {
  key: Self;
  id: number;
}

export interface ModeElement {
  mode: Mode;
  players: number;
  is_tracked: boolean;
}

export interface Mode {
  type: string;
  name: string;
}

export interface Creature {
  id: number;
  name: string;
  creature_display: CreatureDisplay;
}

export interface CreatureDisplay {
  key: Self;
  id: number;
}

export interface Instance {
  key: Self;
  name: string;
  id: number;
}

export interface Item {
  id: number;
  item: Instance;
}

export interface Phase {
  id: number;
  title: string;
  sections: Section[];
  body_text?: string;
}

export interface Section {
  id: number;
  title: string;
  body_text: string;
  sections?: Section[];
  creature_display?: CreatureDisplay;
}

export interface Asset {
  /**
   * 'tile' | 'zoom'
   */
  key: string;
  value: string;
}
