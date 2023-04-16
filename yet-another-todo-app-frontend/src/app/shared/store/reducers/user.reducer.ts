import { createReducer, on } from '@ngrx/store';
import { CurrentUser } from 'src/app/shared/models/current-user.model';
import { removePassword, setIsLogged, setPassword, setUsername } from '../actions/user.actions';

export const initialState: CurrentUser = {
  user: {
    username: '',
    password: null,
  },
  isLogged: false,
};

export const userReducer = createReducer(
  initialState,
  on(setUsername, (state, { username }) => ({ ...state, user: { ...state.user, username } })),
  on(setPassword, (state, { password }) => ({ ...state, user: { ...state.user, password } })),
  on(removePassword, (state) => ({ ...state, user: { ...state.user, password: null } })),
  on(setIsLogged, (state, { isLogged }) => ({ ...state, isLogged })),
);
