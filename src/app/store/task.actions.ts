import { createAction, props } from '@ngrx/store';
import { TaskState } from '../shared/model/task-state.enum';
import { Task } from '../shared/model/task.type';

const CREATE_TASK = 'CREATE_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const SET_TASKS = 'SET_TASKS';
const UPDATE_TASK_STATE = 'UPDATE_TASK_STATE';
const UPDATE_TASK_END_DATE = 'UPDATE_TASK_END_DATE';

export const createTask = createAction(CREATE_TASK, props<{ task: Task }>());
export const removeTask = createAction(REMOVE_TASK, props<{ taskId: string }>());
export const setTasks = createAction(SET_TASKS, props<{ tasks: Task[] }>());
export const updateTaskState = createAction(UPDATE_TASK_STATE, props<{ taskId: string; newState: TaskState }>());
export const updateTaskEndDate = createAction(UPDATE_TASK_END_DATE, props<{ taskId: string; endDate?: Date }>());
