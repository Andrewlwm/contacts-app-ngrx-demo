import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import {
  selectIsFavourite,
  selectUrl,
} from 'src/app/store/selectors/router.selectors';
import { Contact } from 'src/contacts/contact';
import {
  favouriteContact,
  loadContacts,
} from 'src/contacts/store/actions/contacts.actions';
import {
  selectContacts,
  selectFavouriteContacts,
  selectSearchedContacts,
} from 'src/contacts/store/selectors/selectors.effects';
import { removeContact } from '../../store/actions/contacts.actions';
import { ConfirmDeleteDialog } from './dialogs/confirm-delete-dialog/confirm-delete.dialog';
import { ConfirmFavouriteDialog } from './dialogs/confirm-favourite-dialog/confirm-favourite.dialog';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
})
export class ContactsListComponent implements OnInit, OnDestroy {
  notifier$ = new Subject();
  contacts!: Observable<Contact[]>;
  returnUrl = this.store.select(selectUrl);
  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  ngOnInit(): void {
    this.store
      .select(selectIsFavourite)
      .pipe(
        takeUntil(this.notifier$),
        map((value) => {
          if (value) this.contacts = this.store.select(selectFavouriteContacts);
          else this.contacts = this.store.select(selectContacts);
        })
      )
      .subscribe();
  }

  toggleFavourite(contact: Contact) {
    const dialogRef = this.dialog.open(ConfirmFavouriteDialog, {
      data: contact,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.store.dispatch(favouriteContact({ contact }));
    });
  }

  deleteContact(contact: Contact) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      data: contact,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.store.dispatch(removeContact({ contact }));
    });
  }

  loadSearches(searchTerm: string) {
    this.contacts = this.store.select(selectSearchedContacts(searchTerm));
  }
}
