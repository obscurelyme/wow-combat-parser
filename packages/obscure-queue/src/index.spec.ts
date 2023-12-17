import { Queue, QueueItem } from './index';

function createTaskWrapper(task: jest.Mock): () => Promise<void> {
  return () => {
    return new Promise(resolve => {
      setTimeout(() => {
        task();
        return resolve();
      }, 3000);
    });
  };
}

describe('Queue', () => {
  jest.useFakeTimers();
  it('should enqueue an async task and run it', () => {
    const task = jest.fn();
    const queue: Queue = new Queue();
    const item = new QueueItem();
    item.task = createTaskWrapper(task);

    queue.enqueue(item);

    jest.advanceTimersByTime(3000);

    expect(task).toHaveBeenCalled();
  });
});
