import { createAction, props } from '@ngrx/store';

const SET_TOKEN = 'SET_TOKEN';

export const setToken = createAction(SET_TOKEN, props<{ token: string }>());
