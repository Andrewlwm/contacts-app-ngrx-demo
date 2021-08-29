import { createAction, props } from '@ngrx/store';
import { User } from 'src/auth/user';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);
export const loginSucces = createAction(
  '[Auth] Login Succes',
  props<{ user: User }>()
);
export const loginFail = createAction(
  '[Auth] Login Fail',
  props<{ error: string }>()
);
export const logout = createAction('[Auth] Logout');
