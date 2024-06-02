import { createReducer, on } from '@ngrx/store';
import { Task } from '../../../../../../yet-another-todo-app-shared';
import { TaskTransformer } from '../../models/task-transformer.model';
import { createTask, hideTask, removeTask, setTasks, updateTask } from '../actions/task.actions';

export const initialState: Task[] = [];

export const tasksReducer = createReducer(
  initialState,
  on(createTask, (state, { task }) => [...state, task].sort(sortByCreationDate)),
  on(removeTask, (state, { id }) =>
    [...state].filter((task) => task.getId() !== id).sort(sortByCreationDate),
  ),
  on(updateTask, (state, { task }) =>
    [...state]
      .map((item) => (item.getId() === task.getId() ? task : item))
      .sort(sortByCreationDate),
  ),
  on(hideTask, (state, { id }) =>
    [...state]
      .map((task) => {
        if (task.getId() === id) {
          return TaskTransformer.transform(task, { isHidden: true });
        } else {
          return task;
        }
      })
      .sort(sortByCreationDate),
  ),
  on(setTasks, (_, { tasks }) => [...tasks].sort(sortByCreationDate)),
);

function sortByCreationDate(a: Task, b: Task): number {
  return a.getCreationDate().valueOf() - b.getCreationDate().valueOf();
}
