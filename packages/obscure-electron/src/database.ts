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
    return Promise.all([
      this.configureCombatantsTable(),
      this.configureZonesVisitedTable(),
      this.configureChallengeModeTable(),
      this.configureSpellDamageTable(),
    ]);
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

  private async configureChallengeModeTable() {
    return this._db.schema.hasTable('ChallengeModes').then(async exists => {
      if (!exists) {
        console.log('Creating ChallengeModes table...');
        await this._db.schema.createTable('ChallengeModes', this.createChallengeModeTable);
        console.log('ChallengeModes table created');
      }
    });
  }

  private async configureSpellDamageTable() {
    return this._db.schema.hasTable('SpellDamage').then(async exists => {
      if (!exists) {
        await this._db.schema.createTable('SpellDamage', this.createSpellDamageTable);
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

  private createChallengeModeTable(tb: Knex.CreateTableBuilder) {
    tb.increments('id').primary();
    tb.string('reportGuid');
    tb.text('guid');
    tb.timestamp('timestamp', { useTz: true });
    tb.string('zoneName');
    tb.integer('instanceId');
    tb.integer('challengeModeId');
    tb.integer('keystoneLevel');
    tb.integer('firstAffix');
    tb.integer('secondAffix');
    tb.integer('thirdAffix');
    tb.boolean('success');
    tb.integer('totalTime');
  }

  private createSpellDamageTable(tb: Knex.CreateTableBuilder) {
    tb.increments('id').primary();
    tb.timestamp('timestamp', { useTz: true });
    tb.text('guid');
    // Base Params
    tb.text('sourceGuid');
    tb.text('sourceName');
    tb.integer('sourceFlags');
    tb.integer('sourceRaidFlags');
    tb.text('destGuid');
    tb.text('destName');
    tb.integer('destFlags');
    tb.integer('destRaidFlags');
    // Prefix Params
    tb.integer('spellId');
    tb.text('spellName');
    tb.integer('spellSchool');
    // Suffix Params
    tb.integer('amount');
    tb.integer('baseAmount');
    tb.integer('overkill');
    tb.integer('school');
    tb.integer('resisted');
    tb.integer('blocked');
    tb.integer('absorbed');
    tb.boolean('critical');
    tb.boolean('glancing');
    tb.boolean('crushing');
    tb.boolean('isOffHand');
    tb.string('supportPlayerGuid').nullable();
    // Advanced Params
    tb.string('infoGUID');
    tb.string('ownerGUID');
    tb.integer('currentHP');
    tb.integer('maxHP');
    tb.integer('attackPower');
    tb.integer('spellPower');
    tb.integer('armor');
    tb.integer('absorb');
    tb.integer('powerType');
    tb.integer('currentPower');
    tb.integer('maxPower');
    tb.integer('powerCost');
    tb.integer('positionX');
    tb.integer('positionY');
    tb.integer('uiMapID');
    tb.integer('facing');
    tb.integer('level');
    // Custom
    tb.string('reportGuid');
    tb.string('encounterGuid');
  }
}

export default new CombatDB();
