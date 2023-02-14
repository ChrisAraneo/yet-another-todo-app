import { createReducer, on } from '@ngrx/store';
import { TaskCreator } from 'src/app/models/task-creator.model';
import { Task } from '../../models/task.model';
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
      .map((item) => {
        if (item.getId() === id) {
          const copy = cloneTask(item);
          copy.setIsHidden(true);

          return copy;
        }

        return item;
      })
      .sort(sortByCreationDate),
  ),
  on(setTasks, (_, { tasks }) => [...tasks].sort(sortByCreationDate)),
);

function sortByCreationDate(a: Task, b: Task): number {
  return a.getCreationDate().valueOf() - b.getCreationDate().valueOf();
}

function cloneTask(task: Task): Task {
  return TaskCreator.create(JSON.parse(JSON.stringify(task)));
}
