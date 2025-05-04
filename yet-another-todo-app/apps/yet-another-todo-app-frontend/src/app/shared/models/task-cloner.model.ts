import { Task, TaskCreator } from '../../../../../yet-another-todo-app-shared';

export const TaskCloner = {
  clone(task: Task): Task {
    const json = JSON.stringify(task);
    const data = JSON.parse(json);

    return TaskCreator.create(data);
  },
};
