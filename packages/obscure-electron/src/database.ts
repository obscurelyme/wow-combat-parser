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
      useNullAsDefault: true,
    });

    console.log(`Database connection opened`);
  }

  public initialize(): Promise<void[]> {
    return Promise.all([this.configureCombatantsTable(), this.configureZonesVisitedTable()]);
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
    tb.string('guid').notNullable();
    tb.string('reportGuid').notNullable();
    tb.string('encounterGuid').notNullable();
    tb.integer('timestamp').notNullable();
    tb.text('playerName').nullable();
    tb.text('playerGuid').notNullable();
    tb.integer('faction').notNullable();
    tb.integer('strength').nullable();
    tb.integer('agility').nullable();
    tb.integer('stamina').nullable();
    tb.integer('intellect').nullable();
    tb.integer('dodge').nullable();
    tb.integer('parry').nullable();
    tb.integer('block').nullable();
    tb.integer('critMelee').nullable();
    tb.integer('critRanged').nullable();
    tb.integer('critSpell').nullable();
    tb.integer('speed').nullable();
    tb.integer('lifesteal').nullable();
    tb.integer('hasteMelee').nullable();
    tb.integer('hasteRanged').nullable();
    tb.integer('hasteSpell').nullable();
    tb.integer('avoidance').nullable();
    tb.integer('mastery').nullable();
    tb.integer('versatilityDamageDone').nullable();
    tb.integer('versatilityHealingDone').nullable();
    tb.integer('versatilityDamageTaken').nullable();
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
    tb.integer('timestamp');
    tb.text('guid');
    tb.integer('instanceId');
    tb.text('zoneName');
    tb.integer('difficultyId');
  }
}

export default new CombatDB();
