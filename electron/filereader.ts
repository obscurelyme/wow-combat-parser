import * as fs from 'fs';
import * as readline from 'readline';
import path from 'path';
import { EventEmitter } from 'node:events';
import { v4 as uuidv4 } from 'uuid';
import { RawCombatLog, Report } from './types';
import { ReportBuilder } from './reportbuilder';

export declare interface FileReader {
  on(event: 'done', listener: (contents: Report) => void): this;
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

  public read(reportName: string, filePath: string) {
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

      // NOTE: this is nonsense because it wastes so much memory. get rid of this!!!
      this._rawCombatLog.push({
        timestamp,
        id: uuidv4(),
        subevent: params?.shift() ?? 'UNKNOWN',
        params: params?.join('|') ?? '',
      });
    });

    this._readInterface.on('close', () => {
      this.emitDone(report.getInfo());
    });
  }

  private emitDone(reportInfo: Report) {
    this.emit('done', reportInfo);
  }
}
