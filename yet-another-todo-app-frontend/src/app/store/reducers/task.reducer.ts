import { createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { createTask, removeTask, setTasks, updateTask } from '../actions/task.actions';

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
  on(setTasks, (_, { tasks }) => [...tasks].sort(sortByCreationDate)),
);

function sortByCreationDate(a: Task, b: Task): number {
  return a.getCreationDate().valueOf() - b.getCreationDate().valueOf();
}
