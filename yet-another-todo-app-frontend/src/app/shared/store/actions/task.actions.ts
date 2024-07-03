import { createAction, props } from '@ngrx/store';
import { Task } from '../../../../../../yet-another-todo-app-shared';

// TODO Rename actions according to best practices
export const CREATE_TASK_API = 'CREATE_TASK_API';
export const UPDATE_TASK_API = 'UPDATE_TASK_API';
export const HIDE_TASK_API = 'HIDE_TASK_API';
export const UPDATE_TASKS_API = 'UPDATE_TASKS_API';

const CREATE_TASK = 'CREATE_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const HIDE_TASK = 'HIDE_TASK';
const SET_TASKS = 'SET_TASKS';

export const sendCreateTaskRequest = createAction(
  CREATE_TASK_API,
  props<{ task: Task; operationId: string }>(),
);
export const sendUpdateTaskRequest = createAction(
  UPDATE_TASK_API,
  props<{ task: Task; operationId: string }>(),
);
export const sendHideTaskRequest = createAction(
  HIDE_TASK_API,
  props<{ id: string; operationId: string }>(),
);
export const sendUpdateTasksRequest = createAction(
  UPDATE_TASKS_API,
  props<{ tasks: Task[]; operationId: string }>(),
);

export const createTask = createAction(CREATE_TASK, props<{ task: Task }>());
export const removeTask = createAction(REMOVE_TASK, props<{ id: string }>());
export const updateTask = createAction(UPDATE_TASK, props<{ task: Task }>());
export const hideTask = createAction(HIDE_TASK, props<{ id: string }>());
export const setTasks = createAction(SET_TASKS, props<{ tasks: Task[] }>());
