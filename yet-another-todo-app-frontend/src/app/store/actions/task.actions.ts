import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const CREATE_TASK = 'CREATE_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
const HIDE_TASK = 'HIDE_TASK';
const SET_TASKS = 'SET_TASKS';

export const createTask = createAction(CREATE_TASK, props<{ task: Task }>());
export const removeTask = createAction(REMOVE_TASK, props<{ id: string }>());
export const updateTask = createAction(UPDATE_TASK, props<{ task: Task }>());
export const hideTask = createAction(HIDE_TASK, props<{ id: string }>());
export const setTasks = createAction(SET_TASKS, props<{ tasks: Task[] }>());
