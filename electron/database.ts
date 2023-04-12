import knex, { Knex } from 'knex';
import { join } from 'path';

export class CombatDB {
  private _databaseFilePath: string;
  private _db: Knex;

  public constructor() {
    this._databaseFilePath = join(__dirname, '../database.db');
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
