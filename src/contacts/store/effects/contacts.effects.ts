import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Contact, contacts } from 'src/contacts/contact';
import { ContactsService } from 'src/contacts/services/contacts.service';
import * as ContactsActions from '../actions/contacts.actions';
import { selectContacts } from '../selectors/selectors.effects';

@Injectable()
export class ContactsEffects {
  constructor(
    private actions$: Actions,
    private contactsService: ContactsService,
    private store: Store
  ) {}

  loadContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsActions.loadContacts),
      switchMap(() => {
        return this.contactsService.getContacts().pipe(
          map((contacts) => ContactsActions.loadContactsSucces({ contacts })),
          catchError(() => of(ContactsActions.loadContactsFail))
        );
      })
    )
  );

  favouriteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsActions.favouriteContact),
      switchMap(({ contact }) => {
        return this.contactsService.favouriteContact(contact).pipe(
          map((contact) => {
            return ContactsActions.favouriteContactSucces({ contact });
          })
        );
      })
    )
  );

  addContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsActions.addContact),
      switchMap(({ contact }) => {
        return this.contactsService.addContact(contact).pipe(
          map((contact) => {
            return ContactsActions.addContactSucces({ contact });
          })
        );
      })
    )
  );

  removeContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsActions.removeContact),
      switchMap(({ contact }) => {
        return this.contactsService.removeContact(contact).pipe(
          map((contact) => {
            return ContactsActions.removeContactSucces({ contact });
          })
        );
      })
    )
  );

  saveChanges$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ContactsActions.addContactSucces,
          ContactsActions.favouriteContactSucces,
          ContactsActions.removeContactSucces,
          ContactsActions.updateContactSucces
        ),
        withLatestFrom(this.store.select(selectContacts)),
        tap(([action, contacts]) => {
          if (contacts.length === 1)
            contacts = [
              ...JSON.parse(localStorage.getItem('contacts') || '[]'),
              action.contact,
            ];
          localStorage.setItem('contacts', JSON.stringify(contacts));
        })
      ),
    { dispatch: false }
  );
}
