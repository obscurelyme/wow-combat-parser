import { app } from 'electron';
import knex, { Knex } from 'knex';
import { join } from 'path';

export class CombatDB {
  private _databaseFilePath: string;
  private _db: Knex;

  public constructor() {
    if (app.isPackaged) {
      this._databaseFilePath = join(process.resourcesPath, './database.db');
    } else {
      this._databaseFilePath = join(__dirname, '../../../database.db');
    }

    console.log(`Opening connection to database at: ${this._databaseFilePath}`);

    this._db = knex({
      client: 'sqlite3',
      connection: {
        filename: this._databaseFilePath,
      },
    });
  }

  public connection(): Knex {
    return this._db;
  }
}

export default new CombatDB();
