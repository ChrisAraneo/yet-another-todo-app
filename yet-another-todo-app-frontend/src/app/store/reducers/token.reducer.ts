import { createReducer, on } from '@ngrx/store';
import { setToken } from '../actions/token.actions';

type State = {
  token: null | string;
};

export const initialState: State = {
  token: null,
};

export const tokenReducer = createReducer(
  initialState,
  on(setToken, (state, { token }) => ({ ...state, token })),
);
