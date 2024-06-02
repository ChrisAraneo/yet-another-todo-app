import { TaskCreator } from '../../../../../yet-another-todo-app-shared/src/models/task-creator.model';
import { Task } from './task.model';

export class TaskCloner {
  static clone(task: Task): Task {
    const json = JSON.stringify(task);
    const data = JSON.parse(json);

    return TaskCreator.create(data);
  }
}
