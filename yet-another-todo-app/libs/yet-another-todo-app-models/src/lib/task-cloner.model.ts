import { TaskCreator } from './task-creator.model';
import { Task } from './task.model';

export const TaskCloner = {
  clone(task: Task): Task {
    const json = JSON.stringify(task);
    const data = JSON.parse(json);

    return TaskCreator.create(data);
  },
};
