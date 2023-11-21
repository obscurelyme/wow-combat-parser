export interface JournalEncounter {
  id: number;
  name: string;
  description: string;
  map0: number;
  map1: number;
  journalEncounterId: number;
  journalInstanceId: number;
  dungeonEncounterId: number;
  uiMapId: number;
  mapDisplayConditionId: number;
  flags: number;
  difficultyMask: number;
}

export interface AuthToken {
  token: string;
  expireTimestamp: number;
}

export interface RawCombatLog {
  id: string;
  timestamp: number;
  subevent: string;
  params: string;
}

export interface User {
  id: number;
  profileToken?: string;
  profileTokenExpireDate?: number;
  generalToken?: string;
  generalTokenExpireDate?: number;
}

export type AuthPayload = Omit<User, 'id'>;

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
  reportGuid: string;
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

export interface IElectronError {
  name: string;
  message: string;
  cause?: unknown;
  code?: number;
  stack?: string;
}

export class ElectronError extends Error {
  code?: number;

  public constructor(arg?: string | IElectronError | ElectronError) {
    if (arg instanceof ElectronError) {
      super(arg.message);
      this.name = 'Electron Error';
      this.stack = arg.stack;
      this.cause = arg.cause;
    } else if (typeof arg === 'string') {
      super(arg);
      this.name = 'Electron Error';
      return;
    } else {
      super(arg?.message);
      this.name = 'Electron Error';
    }
    this.code = arg?.code;
  }

  public serialize(): IElectronError {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      code: this.code,
      stack: this.stack,
    };
  }
}

export type ElectronResult<T> = {
  data?: T;
  error?: IElectronError;
};

export * from './difficulty';
export * from './warcraft';
export * from './combatant';
export * from './zonechange';
export * from './mapchange';
export * as BnetCommon from './bnet/common';
export * as BnetJournalData from './bnet/journal';
export * as BnetCreatureData from './bnet/creature';
