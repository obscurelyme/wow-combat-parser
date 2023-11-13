import * as fs from 'fs';
import * as readline from 'readline';
import { once } from 'events';
import path from 'path';
import { EventEmitter } from 'node:events';
import { v4 as uuidv4 } from 'uuid';
import { RawCombatLog, Report } from './types';
import { ReportBuilder } from './reportbuilder';
import { parseRawCombatLog } from './parsers/rawcombatlog';

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

          try {
            const rawCombatLog = parseRawCombatLog(line);
          } catch (e) {
            console.log(`Disgarding line ${line}`);
          }
        } catch(e) {
          console.log(e);
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

    this._readInterface.on('line', async line => {
      try {
        const rawCombatLog = parseRawCombatLog(line);

        if (firstLine) {
          report.beginReport(rawCombatLog.timestamp);
          firstLine = false;
        }

        switch (rawCombatLog.subevent) {
          case 'ENCOUNTER_START': {
            await report.beginEncounter(rawCombatLog);
            break;
          }
          case 'ENCOUNTER_END': {
            await report.endEncounter(rawCombatLog);
            break;
          }
          case 'ZONE_CHANGE': {
            await report.zoneChange(rawCombatLog);
            break;
          }
          case 'MAP_CHANGE': {
            await report.mapChange(rawCombatLog);
            break;
          }
          case 'COMBATANT_INFO': {
            // NOTE: ignore events outside of an encounter, for now
            if (report.inEncounter()) {
              await report.combatantInfo(rawCombatLog);
            }
            break;
          }
          default: {
            // NOTE: General combat log
            await report.combatLog(rawCombatLog);
          }
        }
      } catch (e) {
        console.log(`Disgarding line ${line}`);
        return;
      }
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
