import { createReducer, on } from '@ngrx/store';
import { SignInData } from 'src/app/models/sign-in-data.model';
import { removePassword, setPassword, setUsername } from '../actions/user.actions';

export const initialState: SignInData = {
  username: '',
  password: null,
};

export const userReducer = createReducer(
  initialState,
  on(setUsername, (state, { username }) => ({ ...state, username })),
  on(setPassword, (state, { password }) => ({ ...state, password })),
  on(removePassword, (state) => ({ ...state, password: null })),
);
