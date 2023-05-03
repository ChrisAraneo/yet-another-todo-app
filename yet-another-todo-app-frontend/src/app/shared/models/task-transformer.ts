import { TaskCreator } from './task-creator.model';
import { Task } from './task.model';

export class TaskTransformer {
  static transform(task: Task, changes: object): Task {
    const json = JSON.stringify(task);
    const data = JSON.parse(json);

    Object.getOwnPropertyNames(changes).forEach((key) => {
      data[key] = (changes as any)[key];
    });

    return TaskCreator.create(data);
  }
}
