import * as fs from 'fs';
import * as readline from 'readline';
import { once } from 'events';
import path from 'path';
import { EventEmitter } from 'node:events';
import { Report } from './types';
import { ReportBuilder } from './reportbuilder';
import { parseRawCombatLog } from './parsers/rawcombatlog';

export declare interface FileReader {
  on(event: 'done', listener: (contents: Report) => void): this;
  on(event: 'valid', listener: (valid: boolean) => void): this;
}

export class FileReader extends EventEmitter {
  private _currentFilePath: string;
  private _readInterface: readline.Interface;
  private _lineCount: number;
  private _currentLineIndex: number;

  public constructor() {
    super();
  }

  public getCurrentFile(): string {
    return this._currentFilePath;
  }

  public async validate(filePath: string): Promise<boolean> {
    this._lineCount = 0;
    let valid = true;
    this._readInterface = readline.createInterface({
      input: fs.createReadStream(path.join(`${filePath}`)),
    });

    this._readInterface.on('line', line => {
      this._lineCount++;
      try {
        try {
          parseRawCombatLog(line);
        } catch (e) {
          console.log(`Disgarding line ${line}`);
        }
      } catch (e) {
        console.log(e);
        this._readInterface.removeAllListeners();
        this._readInterface.close();
        valid = false;
      }
    });

    await once(this._readInterface, 'close');
    this._readInterface.removeAllListeners();

    return valid;
  }

  public async read(reportName: string, filePath: string, reportGuid: string): Promise<Report> {
    this._currentLineIndex = 0;
    let firstLine = true;
    const report = new ReportBuilder(reportName, reportGuid);
    this._currentFilePath = filePath;
    this._readInterface = readline.createInterface({
      input: fs.createReadStream(path.join(`${filePath}`)),
    });

    this._readInterface.on('line', async line => {
      this._currentLineIndex++;
      report.updateProgress(this.getProgress());
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

  /**
   * Returns the progress of the file read.
   * once the
   */
  public getProgress(): number {
    return this._currentLineIndex / this._lineCount;
  }

  private emitDone(reportInfo: Report) {
    this.emit('done', reportInfo);
  }

  private emitValid(valid: boolean) {
    this.emit('valid', valid);
  }
}
