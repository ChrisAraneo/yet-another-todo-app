import { createReducer, on } from '@ngrx/store';
import { Task } from '../shared/model/task.type';
import { createTask, removeTask, setTasks, updateTaskEndDate, updateTaskState } from './task.actions';

export const initialState: Task[] = [];

export const tasksReducer = createReducer(
  initialState,
  on(createTask, (state, { task }) => [...state, task]),
  on(removeTask, (state, { taskId }) => [...state].filter((task) => task.id !== taskId)),
  on(setTasks, (_, { tasks }) => [...tasks]),
  on(updateTaskState, (state, { taskId, newState }) =>
    [...state].map((task) => (task.id === taskId ? { ...task, state: newState } : task)),
  ),
  on(updateTaskEndDate, (state, { taskId, endDate }) =>
    [...state].map((task) => (task.id === taskId ? { ...task, endDate } : task)),
  ),
);
