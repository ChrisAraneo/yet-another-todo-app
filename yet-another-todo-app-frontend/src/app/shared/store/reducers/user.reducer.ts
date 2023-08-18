import { createReducer, on } from '@ngrx/store';
import { setIsLogged, setIsOfflineMode, setUsername } from '../actions/user.actions';
import { CurrentUser } from '../types/current-user.type';

export const initialState: CurrentUser = {
  username: '',
  isLogged: false,
  isOfflineMode: false,
};

export const userReducer = createReducer(
  initialState,
  on(setUsername, (state, { username }) => ({ ...state, username })),
  on(setIsLogged, (state, { isLogged }) => ({ ...state, isLogged })),
  on(setIsOfflineMode, (state, { isOfflineMode }) => ({ ...state, isOfflineMode })),
);
