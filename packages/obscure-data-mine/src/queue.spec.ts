import { Queue, QueueItem } from './queue';

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

  it('should enqueue many async tasks and run them', async () => {
    const task1 = jest.fn().mockImplementation(() => {
      console.log('task 1');
    });
    const task2 = jest.fn().mockImplementation(() => {
      console.log('task 2');
    });
    const task3 = jest.fn().mockImplementation(() => {
      console.log('task 3');
    });

    const queue: Queue = new Queue();

    const item = new QueueItem();
    const item2 = new QueueItem();
    const item3 = new QueueItem();

    item.task = createTaskWrapper(task1);
    item2.task = createTaskWrapper(task2);
    item3.task = createTaskWrapper(task3);

    queue.enqueue(item);
    queue.enqueue(item2);
    queue.enqueue(item3);

    jest.advanceTimersByTime(3000);

    expect(task1).toHaveBeenCalled();
    expect(task2).not.toHaveBeenCalled();
    expect(task3).not.toHaveBeenCalled();

    jest.advanceTimersByTime(3000);

    expect(task2).toHaveBeenCalled();
    expect(task3).not.toHaveBeenCalled();

    jest.advanceTimersByTime(3000);
    expect(task3).toHaveBeenCalled();
  }, 6000000);
});
