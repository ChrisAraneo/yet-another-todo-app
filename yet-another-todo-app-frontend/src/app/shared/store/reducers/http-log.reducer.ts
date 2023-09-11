import { createReducer, on } from '@ngrx/store';
import {
  pushToDeleteTaskHttpLog,
  pushToDeleteUserHttpLog,
  pushToGetTasksHttpLog,
  pushToPostLoginHttpLog,
  pushToPostRefreshHttpLog,
  pushToPostSignupHttpLog,
  pushToPostTaskHttpLog,
  pushToPostTasksHttpLog,
} from '../actions/http-log.actions';
import { HttpLogState } from '../types/http-log-state.type';

export const initialState: HttpLogState = {
  get: {
    tasks: [],
  },
  post: {
    signUp: [],
    login: [],
    refresh: [],
    tasks: [],
    task: [],
  },
  delete: {
    task: [],
    user: [],
  },
};

export const httpLogReducer = createReducer(
  initialState,
  on(pushToPostSignupHttpLog, (state, item) => updateHttpLogState(state, 'post', 'signUp', item)),
  on(pushToPostLoginHttpLog, (state, item) => updateHttpLogState(state, 'post', 'login', item)),
  on(pushToPostRefreshHttpLog, (state, item) => updateHttpLogState(state, 'post', 'refresh', item)),
  on(pushToGetTasksHttpLog, (state, item) => updateHttpLogState(state, 'get', 'tasks', item)),
  on(pushToPostTasksHttpLog, (state, item) => updateHttpLogState(state, 'post', 'tasks', item)),
  on(pushToPostTaskHttpLog, (state, item) => updateHttpLogState(state, 'post', 'task', item)),
  on(pushToDeleteTaskHttpLog, (state, item) => updateHttpLogState(state, 'delete', 'task', item)),
  on(pushToDeleteUserHttpLog, (state, item) => updateHttpLogState(state, 'delete', 'user', item)),
);

function updateHttpLogState(
  currentState: HttpLogState,
  method: string,
  endpointName: string,
  item: any,
): HttpLogState {
  return {
    ...currentState,
    [method]: {
      ...(currentState as any)[method],
      [endpointName]: [...(currentState as any)[method][endpointName], item],
    },
  } as HttpLogState;
}
