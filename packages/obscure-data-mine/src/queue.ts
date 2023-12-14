export class QueueItem {
  public next: QueueItem | null = null;
  public queue: Queue;

  public task: (() => Promise<void>) | null = null;

  public async run(): Promise<void> {
    await this.task();
    if (this.next) {
      this.queue.runNext();
    } else {
      this.queue.currentItem = null;
      this.queue.finish(true);
    }
  }
}

export class Queue {
  public lastItem: QueueItem = null;
  public currentItem: QueueItem = null;
  public finish: (value: boolean | PromiseLike<boolean>) => void;
  public pending: Promise<boolean> = new Promise(resolve => {
    this.finish = resolve;
  });

  public enqueue(item: QueueItem): void {
    item.queue = this;
    if (this.currentItem == null) {
      this.currentItem = item;
      this.lastItem = item;
      this.currentItem.run?.();
    } else {
      const temp = this.lastItem;
      temp.next = item;
      this.lastItem = item;
    }
  }

  public runNext(): void {
    this.currentItem = this.currentItem.next;
    this.currentItem.run?.();
  }

  public async run(): Promise<void> {
    while (this.currentItem) {
      await this.currentItem.task();
      this.currentItem = this.currentItem.next;
    }
  }
}
