import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { Go } from 'src/app/store/actions/router.actions';
import { AuthService } from 'src/auth/services/auth.service';
import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) => {
        return this.authService.login(username, password).pipe(
          map(({ user }) => AuthActions.loginSucces({ user })),
          catchError((error) => of(AuthActions.loginFail({ error })))
        );
      })
    )
  );

  loginSucces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSucces),
      tap(({ user }) => localStorage.setItem('user', JSON.stringify(user))),
      switchMap(() => of(Go({ path: ['/'] })))
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('user');
      }),
      switchMap(() => of(Go({ path: ['/login'] })))
    )
  );
}
