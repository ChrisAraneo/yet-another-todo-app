import { TaskCreator, Task } from '../../../../../yet-another-todo-app-shared';

export class TaskCloner {
  static clone(task: Task): Task {
    const json = JSON.stringify(task);
    const data = JSON.parse(json);

    return TaskCreator.create(data);
  }
}
