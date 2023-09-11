import { createAction, props } from '@ngrx/store';

const SET_USERNAME = 'SET_USERNAME';
const SET_IS_LOGGED = 'SET_IS_LOGGED';
const SET_IS_OFFLINE_MODE = 'SET_IS_OFFLINE_MODE';

export const setUsername = createAction(SET_USERNAME, props<{ username: string }>());
export const setIsLogged = createAction(SET_IS_LOGGED, props<{ isLogged: boolean }>());
export const setIsOfflineMode = createAction(
  SET_IS_OFFLINE_MODE,
  props<{ isOfflineMode: boolean }>(),
);
