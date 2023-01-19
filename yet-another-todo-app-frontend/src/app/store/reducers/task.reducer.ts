import { createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { createTask, removeTask, setTasks } from '../actions/task.actions';

export const initialState: Task[] = [];

export const tasksReducer = createReducer(
  initialState,
  on(createTask, (state, { task }) => [...state, task]),
  on(removeTask, (state, { id }) => [...state].filter((task) => task.getId() !== id)),
  on(setTasks, (_, { tasks }) => [...tasks]),
);
