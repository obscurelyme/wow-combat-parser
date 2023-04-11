export interface RawCombatLog {
  id: string;
  timestamp: number;
  subevent: string;
  params: string;
}

export interface Encounter {
  startTime: number;
  endTime: number;
  encounterId: number;
  reportGuid: string;
  guid: string;
  name: string;
  success: number;
  difficultyId: number;
  numPlayers: number;
}

export interface Report {
  timestamp: number;
  guid: string;
  name: string;
}
