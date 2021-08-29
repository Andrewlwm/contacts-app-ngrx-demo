import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Go } from 'src/app/store/actions/router.actions';
import { Contact } from '../contact';
import { loadContacts } from '../store/actions/contacts.actions';
import {
  selectEntities,
  selectLoaded,
} from '../store/selectors/selectors.effects';

@Injectable({
  providedIn: 'root',
})
export class ContactExistsGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.id);
        return this.contactExists(id).pipe(
          map((value) => {
            if (value) return true;
            return this.router.parseUrl('/contacts');
          })
        );
      })
    );
  }

  contactExists(id: number): Observable<boolean> {
    return this.store.select(selectEntities).pipe(
      map((entities: { [key: number]: Contact }) => !!entities[id]),
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
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
