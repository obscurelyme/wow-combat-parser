export interface SpellDamageEvent {
  sourceGuid: string;
  sourceName: string;
  sourceFlags: string;
  sourceRaidFlags: number;
  destGuid: string;
  destName: string;
  destFlags: string;
  destRaidFlags: number;
  spellId: number;
  spellName: string;
  spellSchool: number;
  amount: number;
  overkill: number;
  school: any;
  resisted: number;
  blocked: number;
  absorbed: number;
  critical: number;
  glancing: number;
  crushing: number;
  isOffHand: number;
}
