import { createAction, props } from '@ngrx/store';

const SET_USERNAME = 'SET_USERNAME';
const SET_PASSWORD = 'SET_PASSWORD'; // TODO Check security
const REMOVE_PASSWORD = 'REMOVE_PASSWORD';

export const setUsername = createAction(SET_USERNAME, props<{ username: string }>());
export const setPassword = createAction(SET_PASSWORD, props<{ password: string }>());
export const removePassword = createAction(REMOVE_PASSWORD);
