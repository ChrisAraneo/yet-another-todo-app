import { Task } from '../models/task.model';
import { TaskCreator } from './task-creator.model';

export class TaskModifier {
  static modify(task: Task, changes: object): Task {
    const json = JSON.stringify(task);
    const data = JSON.parse(json);

    Object.getOwnPropertyNames(changes).forEach((key) => {
      data[key] = (changes as any)[key];
    });

    return TaskCreator.create(data);
  }
}
