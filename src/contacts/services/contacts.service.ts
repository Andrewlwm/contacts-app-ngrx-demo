import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Contact, contacts } from '../contact';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  _contacts: Contact[] = [
    ...(JSON.parse(localStorage.getItem('contacts')!) || contacts),
  ];
  constructor() {}

  getContacts() {
    return of(this._contacts);
  }

  addContact(contact: Contact) {
    this._contacts = [...this._contacts, contact];
    return of(contact);
  }

  removeContact(contact: Contact) {
    this._contacts = this._contacts.filter((c) => c.id !== contact.id);
    return of(contact);
  }

  updateContact(contact: Contact) {
    this._contacts[contact.id] = contact;
    return of(contact);
  }

  favouriteContact(contact: Contact) {
    const c: Contact = { ...contact, favourite: !contact.favourite };
    const contacts = this._contacts.filter(({ id }) => id !== contact.id);
    this._contacts = [...contacts, c];

    return of(c);
  }
}
