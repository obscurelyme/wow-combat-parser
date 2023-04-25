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

export interface IElectronError {
  name: string;
  message: string;
  cause?: unknown;
  code?: number;
  stack?: string;
}

export class ElectronError extends Error {
  code?: number;

  public constructor(arg?: string | IElectronError) {
    if (typeof arg === 'string') {
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
