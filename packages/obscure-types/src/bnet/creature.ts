import { Asset, Link } from './common';

export interface CreatureDisplayMedia {
  _links: Link;
  id: string;
  assets: Asset[];
}
