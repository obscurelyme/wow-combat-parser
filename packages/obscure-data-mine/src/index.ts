import { join } from 'path';
import { createReadStream, readdirSync } from 'fs';
import { parse } from 'csv';
import knex, { Knex } from 'knex';
import { performance, PerformanceObserver } from 'perf_hooks';

import { JournalEncounter } from '@obscure/types';

import { Queue, QueueItem } from './queue';

const perfObserver = new PerformanceObserver(items => {
  items.getEntries().forEach(entry => {
    console.log(entry);
  });
});

perfObserver.observe({ entryTypes: ['measure'], buffered: true });

type Encounter = Omit<JournalEncounter, 'id'>;

const queue = new Queue();
const buffer: Encounter[] = [];

function writeLog(msg: string) {
  console.log(`[ODM EVENT]=> ${msg}`);
}

const DATABASE_FILE = join(__dirname, '../../../database2.db');

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

async function readFile(filePath: string) {
  return new Promise<void>((resolve, reject) => {
    const csvFile = join(__dirname, `../seed/${filePath}`);
    writeLog(`Reading CSV file ${csvFile}...`);
    const stream = createReadStream(csvFile)
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', async row => {
        // stream.pause();
        const entry: Encounter = {
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
        buffer.push(entry);
        if (buffer.length == 500) {
          const partialBuffer = buffer.splice(0, buffer.length);
          // NOTE: insert into queue
          const item = new QueueItem();
          item.task = () => {
            return db('JournalEncounters').insert(partialBuffer);
          };
          queue.enqueue(item);
        }
        // await db('JournalEncounters').insert(entry);
        // stream.resume();
      })
      .on('close', () => {
        // NOTE: whatever is left in buffer we just enqueue it
        const partialBuffer = buffer.splice(0, buffer.length);
        // NOTE: insert into queue
        const item = new QueueItem();
        item.task = () => {
          return db('JournalEncounters').insert(partialBuffer);
        };
        queue.enqueue(item);
        return resolve();
      })
      .on('error', error => reject(error));
  });
}

async function main() {
  writeLog('Reading seed directory...');

  const files = readdirSync(join(__dirname, '../seed'));

  writeLog('Files found.');

  files.forEach(file => writeLog(`File: ${file}`));

  await db.schema.hasTable('JournalEncounters').then(async exists => {
    if (!exists) {
      // NOTE: make the table
      writeLog('JournalEncounters table not found, creating table...');
      await db.schema.createTable('JournalEncounters', createJournalEncountersTable);
      writeLog('JournalEncounters table created!');
    } else {
      writeLog('JournalEncounters table already exists, skipping table creation.');
    }

    performance.mark('begin file read');
    await readFile(files[0]);
    performance.mark('end file read');
  });

  performance.mark('wait pending queue');
  await queue.pending;
  performance.mark('complete queue');

  performance.measure('File Read', 'begin file read', 'end file read');
  performance.measure('Queue', 'wait pending queue', 'complete queue');

  await db.destroy(() => {
    writeLog('DB connection closed');
  });
}

main();
