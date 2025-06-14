import { get, set } from 'lodash';

import {
  Task,
  TaskCreator,
} from '../../../../../../__to-migrate/yet-another-todo-app-shared/dist';

export const TaskTransformer = {
  transform(task: Task, changes: object): Task {
    const json = JSON.stringify(task);
    const data = JSON.parse(json);

    for (const key of Object.getOwnPropertyNames(changes)) {
      set(data, key, get(changes, key));
    }

    return TaskCreator.create(data);
  },
};
