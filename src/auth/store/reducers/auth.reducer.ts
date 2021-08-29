import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/auth/user';
import * as AuthActions from '../actions/auth.actions';

export interface AuthState {
  user: User | null;
  error: string;
}

export const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loginSucces, (state, { user }) => ({
    ...state,
    user,
    error: '',
  })),
  on(AuthActions.loginFail, (state, { error }) => ({
    ...state,
    user: null,
    error,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    error: '',
  }))
);
