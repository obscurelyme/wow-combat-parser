import * as fs from 'fs';
import * as readline from 'readline';
import { once } from 'events';
import path from 'path';
import { EventEmitter } from 'node:events';
import { v4 as uuidv4 } from 'uuid';
import { RawCombatLog, Report } from './types';
import { ReportBuilder } from './reportbuilder';
import { ElectronError } from '@obscure/types';

export declare interface FileReader {
  on(event: 'done', listener: (contents: Report) => void): this;
  on(event: 'valid', listener: (valid: boolean) => void): this;
}

export class FileReader extends EventEmitter {
  private _currentFilePath: string;
  private _readInterface: readline.Interface;
  private _rawCombatLog: RawCombatLog[];
  private _currentYear: number;

  public constructor() {
    super();
    this._currentYear = new Date().getFullYear();
    this._rawCombatLog = [];
  }

  public getCurrentFile(): string {
    return this._currentFilePath;
  }

  public async validate(filePath: string) {
    let firstLine = true;
    this._readInterface = readline.createInterface({
      input: fs.createReadStream(path.join(`${filePath}`)),
    });
    const validationPromise = new Promise<boolean>(resolve => {
      this._readInterface.on('line', line => {
        try {
          if (firstLine) {
            firstLine = false;
          }
          const e = line.split('  ');
          const d = e[0].split(' ');
          d[0] += `/${this._currentYear}`;
          const timestamp = new Date(d.join(' ')).getTime();
          const params = e[1].match(/("[^"]*")|[^,]+/g);

          const rawCombatLog: RawCombatLog = {
            timestamp,
            id: uuidv4(),
            subevent: params?.shift() ?? 'UNKNOWN',
            params: params?.join('|').replaceAll('"', '') ?? '',
          };
        } catch {
          this._readInterface.removeAllListeners();
          this._readInterface.close();
          resolve(false);
        }
      });

      this._readInterface.on('close', () => {
        this._readInterface.removeAllListeners();
        if (firstLine) {
          return resolve(false);
        }
        resolve(true);
      });
    });

    return validationPromise;
  }

  public async read(reportName: string, filePath: string): Promise<Report> {
    let firstLine = true;
    const report = new ReportBuilder(reportName);
    this._currentFilePath = filePath;
    this._readInterface = readline.createInterface({
      input: fs.createReadStream(path.join(`${filePath}`)),
    });

    this._readInterface.on('line', line => {
      const e = line.split('  ');
      const d = e[0].split(' ');
      d[0] += `/${this._currentYear}`;
      const timestamp = new Date(d.join(' ')).getTime();
      const params = e[1].match(/("[^"]*")|[^,]+/g);

      if (firstLine) {
        report.beginReport(timestamp);
        firstLine = false;
      }

      const rawCombatLog: RawCombatLog = {
        timestamp,
        id: uuidv4(),
        subevent: params?.shift() ?? 'UNKNOWN',
        params: params?.join('|').replaceAll('"', '') ?? '',
      };

      if (rawCombatLog.subevent === 'ENCOUNTER_START') {
        report.beginEncounter(rawCombatLog);
      }

      if (rawCombatLog.subevent === 'ENCOUNTER_END') {
        report.endEncounter(rawCombatLog);
      }

      // if (report.inEncounter()) {
      //   console.log(rawCombatLog.subevent);
      // }

      /**
       * if (inEncounter) {
       *  Store the log as a CombatEvent
       * } else {
       *  Discard the log
       * }
       */

      // NOTE: this is nonsense because it wastes so much memory. get rid of this!!!
      // Check if it's the start of an encounter, if so create an encounter, store all combat events while !encounterEnd
      // For now, all other combat logs can be discarded.
      // this._rawCombatLog.push({
      //   timestamp,
      //   id: uuidv4(),
      //   subevent: params?.shift() ?? 'UNKNOWN',
      //   params: params?.join('|') ?? '',
      // });
    });

    await once(this._readInterface, 'close');
    return report.getInfo();
  }

  private emitDone(reportInfo: Report) {
    this.emit('done', reportInfo);
  }

  private emitValid(valid: boolean) {
    this.emit('valid', valid);
  }
}
