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
