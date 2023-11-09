import { join } from 'path';
import { createReadStream } from 'fs';
import { parse } from 'csv';
import knex, { Knex } from 'knex';

function writeLog(msg: string) {
  console.log(`[ODM EVENT]=> ${msg}`);
}

const DATABASE_FILE = join(__dirname, '../../../database.db');

writeLog(`Opening connection to SQLITE3 DB ${DATABASE_FILE}`);
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: DATABASE_FILE,
  },
  useNullAsDefault: true,
});
writeLog('DB connection opened');

function createJournalEncountersTable(tb: Knex.CreateTableBuilder): void {
  tb.increments('id').primary();
  tb.text('name');
  tb.text('description');
  tb.decimal('map0');
  tb.decimal('map1');
  tb.integer('journalEncounterId');
  tb.integer('journalInstanceId');
  tb.integer('dungeonEncounterId');
  tb.integer('uiMapId');
  tb.integer('mapDisplayConditionId');
  tb.integer('flags');
  tb.integer('difficultyMask');
}

async function readFile() {
  return new Promise<void>((resolve, reject) => {
    const csvFile = join(__dirname, `../../../${process.argv[2]}`);
    writeLog(`Reading CSV file ${csvFile}...`);
    const stream = createReadStream(csvFile)
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', async row => {
        stream.pause();
        const entry = {
          name: row[0],
          description: row[1],
          map0: row[2],
          map1: row[3],
          journalEncounterId: row[4],
          journalInstanceId: row[5],
          dungeonEncounterId: row[6],
          uiMapId: row[9],
          mapDisplayConditionId: row[10],
          flags: row[11],
          difficultyMask: row[12],
        };
        await db('JournalEncounters').insert(entry);
        stream.resume();
      })
      .on('close', () => resolve())
      .on('error', error => reject(error));
  });
}

async function main() {
  await db.schema.hasTable('JournalEncounters').then(async exists => {
    if (!exists) {
      // NOTE: make the table
      writeLog('JournalEncounters table not found, creating table...');
      await db.schema.createTable('JournalEncounters', createJournalEncountersTable);
      writeLog('JournalEncounters table created!');
    } else {
      writeLog('JournalEncounters table already exists, skipping table creation.');
    }
    await readFile();
  });

  await db.destroy(() => {
    writeLog('DB connection closed');
  });
}

main();
