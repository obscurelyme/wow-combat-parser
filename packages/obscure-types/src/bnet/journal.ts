import {
  Area,
  Asset,
  ExpansionStub,
  InstanceMode,
  EncounterMode,
  EncounterStub,
  Category,
  Media,
  Creature,
  Drop,
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
  encounters: EncounterStub[];
  expansion: ExpansionStub;
  location: Area;
  modes: InstanceMode[];
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
  items: Drop[];
  sections: Phase[];
  instance: Instance;
  category: Category;
  modes: EncounterMode[];
}

export interface JournalInstanceMedia {
  _links: Link;
  assets: Asset[];
}
