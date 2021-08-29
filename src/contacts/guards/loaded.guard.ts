import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { loadContacts } from '../store/actions/contacts.actions';
import { selectLoaded } from '../store/selectors/selectors.effects';

@Injectable({
  providedIn: 'root',
})
export class LoadedGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLoaded().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkLoaded() {
    return this.store.select(selectLoaded).pipe(
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(loadContacts());
        }
      }),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
