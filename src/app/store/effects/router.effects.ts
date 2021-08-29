import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RouterActions from '../actions/router.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.Go),
        tap(({ path, queryParams, extras }) => {
          this.router.navigate(path, { queryParams, ...extras });
        })
      ),
    { dispatch: false }
  );

  forward$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.Forward),
        tap(() => this.location.forward())
      ),
    { dispatch: false }
  );

  back$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.Back),
        tap(() => this.location.back())
      ),
    { dispatch: false }
  );
}
