import { Queue, QueueItem } from '@obscure/queue';
import { SpellDamageEvent } from '@obscure/types';

import CombatDB from './database';

export class DataQueue {
  _queue: Queue;
  _buffer: SpellDamageEvent[];

  public constructor() {
    this._queue = new Queue();
    this._buffer = [];
  }

  /**
   * Enqueue up to 500 events before creating an insert task and bulk insert into the database
   * @param damageEvent
   */
  public enqueue(damageEvent: SpellDamageEvent): void {
    this._buffer.push(damageEvent);
    if (this._buffer.length === 500) {
      const partialBuffer = this._buffer.splice(0, 500);
      const item = new QueueItem();
      item.task = async () => {
        const conn = CombatDB.connection();
        try {
          await conn('SpellDamage').insert(partialBuffer);
        } catch (e) {
          console.error(e);
        }
      };
      this._queue.enqueue(item);
    }
  }

  /**
   * Awaits all pending tasks
   * @returns
   */
  public pendingTasks() {
    return this._queue.pending;
  }
}
