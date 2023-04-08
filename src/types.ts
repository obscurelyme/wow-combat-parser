export interface BaseParams {
  timestamp: Date;
  id: string;
  subevent: string;
  sourceGuid: string;
  sourceName: string;
  sourceFlags: string;
  sourceRaidFlags: string;
  destGuid: string;
  destName: string;
  destFlags: string;
  destRaidFlags: string;
}

export interface PrefixParams {
  spellId: string;
  spellName: string;
  spellSchool: string;
}

export interface AdvancedParams {
  infoGuid: string;
  ownerGuid: string;
  currentHp: number;
  maxHp: number;
  attackPower: number;
  spellPower: number;
  armor: number;
  absorb: number;
  powerType: number;
  currentPower: number;
  maxPower: number;
  powerCost: number;
  positionX: number;
  positionY: number;
  uiMapId: string;
  facing: number;
  level: number;
}

export interface SuffixParams {
  amount: number;
  overkill: number;
  school: number;
  resisted: null;
  blocked: null;
  absorbed: null;
  critical: boolean;
  glancing: boolean;
  crushing: boolean;
  isOffHand: boolean;
}

export interface CombatEvent extends BaseParams {}
