import { createReducer, on } from '@ngrx/store';
import { CurrentUser } from 'src/app/shared/models/current-user.type';
import { setIsLogged, setIsOfflineMode, setUsername } from '../actions/user.actions';

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
