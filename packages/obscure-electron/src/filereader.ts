import * as fs from 'fs';
import * as readline from 'readline';
import { once } from 'events';
import path from 'path';
import { EventEmitter } from 'node:events';
import { Report } from './types';
import { ReportBuilder } from './reportbuilder';
import { parseRawCombatLog } from './parsers/rawcombatlog';
import { parseCombatLogVersionEvent } from './parsers/combatlogversion';
import { parsePlayerInfo } from './parsers/parsePlayerName';
import { updateCombatant } from './handlers/events/update';

import lineReader from 'line-reader';

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
          const log = parseRawCombatLog(line);
          if (log.subevent === 'COMBAT_LOG_VERSION') {
            const isAdvanced = parseCombatLogVersionEvent(log);
            if (!isAdvanced) {
              // NOTE: we only support advanced combat logs
              valid = false;
              console.log(
                `The log at ${filePath} is not an advanced combat log. This application only supports advanced combat logging.`
              );
            }
          }
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
    this._currentFilePath = filePath;
    const report = new ReportBuilder(reportName, reportGuid);

    await this.readEachLine(report);

    return report.getInfo();
  }

  /**
   * Returns the progress of the file read.
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

  private readEachLine(report: ReportBuilder): Promise<void> {
    let firstLine = true;

    return new Promise(resolve => {
      lineReader.eachLine(this._currentFilePath, async (line, last, cb) => {
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
              console.log('encounter start');
              break;
            }
            case 'ENCOUNTER_END': {
              await report.endEncounter(rawCombatLog);
              console.log('encounter end');
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
              if (report.inEncounter()) {
                const s = await report.combatantInfo(rawCombatLog);
                console.log('[IPC EVENT]=>combatant set', report.combatants().size);
              }
              break;
            }
            case 'CHALLENGE_MODE_START': {
              // NOTE: if in challenge mode and you start a new one, the old mark should be marked as completed and failed.
              console.log('Started challenge mode');
              break;
            }
            case 'CHALLENGE_MODE_END': {
              console.log('Ending challenge mode');
              break;
            }
            default: {
              if (report.inEncounter() && report.combatants().size > 0) {
                try {
                  const { playerName, playerGuid } = parsePlayerInfo(rawCombatLog);
                  if (playerGuid) {
                    const combatant = report.combatants()?.get(playerGuid);
                    if (combatant) {
                      // player is in the list of combatants, update their name in the database
                      // and then remove them from the map
                      await updateCombatant(playerName, playerGuid, report.currentEncounterId());
                      report.combatants().delete(playerGuid);
                    }
                    // NOTE: player is not in the combatant map, we've already delt with this combatant
                  }
                } catch (e) {
                  console.log(e);
                }
              }
            }
          }
        } catch (e) {
          console.log(`Disgarding line ${line}`);
        }

        if (!last) {
          cb?.();
        } else {
          console.log('Last line');
          cb?.(false);
          console.log('resolving');
          resolve();
        }
      });
    });
  }
}
