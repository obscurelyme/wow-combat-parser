import {
  Area,
  Asset,
  Expansion,
  ModeElement,
  Mode,
  Category,
  Media,
  Creature,
  Item,
  Phase,
  Instance,
  Link,
} from './common';

export interface JournalInstance {
  _links: Link;
  id: number;
  name: string;
  map: Area;
  area: Area;
  description: string;
  encounters: Expansion[];
  expansion: Expansion;
  location: Area;
  modes: ModeElement[];
  media: Media;
  minimum_level: number;
  category: Category;
}

export interface JournalEncounter {
  _links: Link;
  id: number;
  name: string;
  description: string;
  creatures: Creature[];
  items: Item[];
  sections: Phase[];
  instance: Instance;
  category: Category;
  modes: Mode[];
}

export interface JournalInstanceMedia {
  _links: Link;
  assets: Asset[];
}
