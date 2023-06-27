import { createAction, props } from '@ngrx/store';
import { HttpLogType } from '../../models/http-log-type.enum';

export const POST_SIGNUP_HTTP_LOG = 'POST_SIGNUP_HTTP_LOG';
export const POST_LOGIN_HTTP_LOG = 'POST_LOGIN_HTTP_LOG';
export const POST_REFRESH_HTTP_LOG = 'POST_REFRESH_HTTP_LOG';
export const GET_TASKS_HTTP_LOG = 'GET_TASKS_HTTP_LOG';
export const POST_TASKS_HTTP_LOG = 'POST_TASKS_HTTP_LOG';
export const POST_TASK_HTTP_LOG = 'POST_TASK_HTTP_LOG';
export const DELETE_TASK_HTTP_LOG = 'DELETE_TASK_HTTP_LOG';
export const DELETE_USER_HTTP_LOG = 'DELETE_USER_HTTP_LOG';

export const pushToPostSignupHttpLog = createAction(
  POST_SIGNUP_HTTP_LOG,
  props<{ id: string; logType: HttpLogType; data: any; creationDate: Date }>(),
);
export const pushToPostLoginHttpLog = createAction(
  POST_LOGIN_HTTP_LOG,
  props<{ id: string; logType: HttpLogType; data: any; creationDate: Date }>(),
);
export const pushToPostRefreshHttpLog = createAction(
  POST_REFRESH_HTTP_LOG,
  props<{ id: string; logType: HttpLogType; data: any; creationDate: Date }>(),
);
export const pushToGetTasksHttpLog = createAction(
  GET_TASKS_HTTP_LOG,
  props<{ id: string; logType: HttpLogType; data: any; creationDate: Date }>(),
);
export const pushToPostTasksHttpLog = createAction(
  POST_TASKS_HTTP_LOG,
  props<{ id: string; logType: HttpLogType; data: any; creationDate: Date }>(),
);
export const pushToPostTaskHttpLog = createAction(
  POST_TASK_HTTP_LOG,
  props<{ id: string; logType: HttpLogType; data: any; creationDate: Date }>(),
);
export const pushToDeleteTaskHttpLog = createAction(
  DELETE_TASK_HTTP_LOG,
  props<{ id: string; logType: HttpLogType; data: any; creationDate: Date }>(),
);
export const pushToDeleteUserHttpLog = createAction(
  DELETE_USER_HTTP_LOG,
  props<{ id: string; logType: HttpLogType; data: any; creationDate: Date }>(),
);
