import { createAction, props } from '@ngrx/store';
import { TaskState } from '../shared/model/task-state.enum';
import { Task } from '../shared/model/task.type';

const CREATE_TASK = 'CREATE_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const UPDATE_TASK_STATE = 'UPDATE_TASK_STATE';

export const createTask = createAction(CREATE_TASK, props<{ task: Task }>());
export const removeTask = createAction(
  REMOVE_TASK,
  props<{ taskId: string }>()
);
export const updateTaskState = createAction(
  UPDATE_TASK_STATE,
  props<{ taskId: string; newState: TaskState }>()
);
