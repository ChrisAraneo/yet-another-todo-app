import { createAction, props } from '@ngrx/store';
import { HttpLogItem } from '../../models/http-log-item.type';

export const POST_SIGNUP_HTTP_LOG = 'POST_SIGNUP_HTTP_LOG';
export const POST_LOGIN_HTTP_LOG = 'POST_LOGIN_HTTP_LOG';
export const POST_REFRESH_HTTP_LOG = 'POST_REFRESH_HTTP_LOG';
export const GET_TASKS_HTTP_LOG = 'GET_TASKS_HTTP_LOG';
export const POST_TASKS_HTTP_LOG = 'POST_TASKS_HTTP_LOG';
export const POST_TASK_HTTP_LOG = 'POST_TASK_HTTP_LOG';
export const DELETE_TASK_HTTP_LOG = 'DELETE_TASK_HTTP_LOG';
export const DELETE_USER_HTTP_LOG = 'DELETE_USER_HTTP_LOG';

export const pushToPostSignupHttpLog = createAction(POST_SIGNUP_HTTP_LOG, props<HttpLogItem>());
export const pushToPostLoginHttpLog = createAction(POST_LOGIN_HTTP_LOG, props<HttpLogItem>());
export const pushToPostRefreshHttpLog = createAction(POST_REFRESH_HTTP_LOG, props<HttpLogItem>());
export const pushToGetTasksHttpLog = createAction(GET_TASKS_HTTP_LOG, props<HttpLogItem>());
export const pushToPostTasksHttpLog = createAction(POST_TASKS_HTTP_LOG, props<HttpLogItem>());
export const pushToPostTaskHttpLog = createAction(POST_TASK_HTTP_LOG, props<HttpLogItem>());
export const pushToDeleteTaskHttpLog = createAction(DELETE_TASK_HTTP_LOG, props<HttpLogItem>());
export const pushToDeleteUserHttpLog = createAction(DELETE_USER_HTTP_LOG, props<HttpLogItem>());
