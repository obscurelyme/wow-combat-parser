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

    console.log(`Database connection opened`);
  }

  public connection(): Knex {
    return this._db;
  }

  private async configureCombatantsTable() {
    return this._db.schema.hasTable('Combatants').then(async exists => {
      if (!exists) {
        // Create the table
        console.log('Creating Combatants table...');
        await this._db.schema.createTable('Combatants', this.createCombatantsTable);
        console.log('Combatants table created');
      }
    });
  }

  private async configureZonesVisitedTable() {
    return this._db.schema.hasTable('ZonesVisited').then(async exists => {
      if (!exists) {
        console.log('Creating ZonesVisited table...');
        await this._db.schema.createTable('ZonesVisited', this.createZonesVisitedTable);
        console.log('ZonesVisited table created');
      }
    });
  }

  /**
   * Creates the Combatant Table
   * @param tb
   * @see Combatant from `@obscure/types`
   */
  private createCombatantsTable(tb: Knex.CreateTableBuilder) {
    tb.increments('id').primary();
    tb.string('encounterGuid');
    tb.integer('timestamp');
    tb.text('playerGuid');
    tb.integer('faction');
    tb.integer('strength');
    tb.integer('agility');
    tb.integer('intellect');
    tb.integer('dodge');
    tb.integer('parry');
    tb.integer('block');
    tb.integer('critMelee');
    tb.integer('critRanged');
    tb.integer('critSpell');
    tb.integer('speed');
    tb.integer('lifesteal');
    tb.integer('hasteMelee');
    tb.integer('hasteRanged');
    tb.integer('hasteSpell');
    tb.integer('avoidance');
    tb.integer('mastery');
    tb.integer('versatilityDamageDone');
    tb.integer('versatilityHealingDone');
    tb.integer('versatilityDamageTaken');
    tb.integer('armor');
    tb.integer('spec');
    tb.text('talents');
    tb.text('pvpTalents');
    tb.text('equippedItems');
    tb.text('interestingAuras');
    tb.text('pvpStats');
    tb.integer('class');
  }

  private createZonesVisitedTable(tb: Knex.CreateTableBuilder) {
    tb.increments('id').primary();
    tb.string('reportGuid');
  }
}

export default new CombatDB();
