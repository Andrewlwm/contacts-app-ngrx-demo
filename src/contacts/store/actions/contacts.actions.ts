import { createAction, props } from '@ngrx/store';
import { Contact } from 'src/contacts/contact';

export const loadContacts = createAction('[Contacts] Load Contacts');
export const loadContactsSucces = createAction(
  '[Contacts] Load Contacts Succes',
  props<{ contacts: Contact[] }>()
);
export const loadContactsFail = createAction('[Contacts] Load Contacts Fail');
export const addContact = createAction(
  '[Contacts] Add Contact',
  props<{ contact: Contact }>()
);
export const addContactSucces = createAction(
  '[Contacts] Add Contact Succes',
  props<{ contact: Contact }>()
);
export const updateContact = createAction(
  '[Contacts] Update Contact',
  props<{ contact: Contact }>()
);
export const updateContactSucces = createAction(
  '[Contacts] Update Contact Succes',
  props<{ contact: Contact }>()
);
export const removeContact = createAction(
  '[Contacts] Remove Contact',
  props<{ contact: Contact }>()
);
export const removeContactSucces = createAction(
  '[Contacts] Remove Contact Succes',
  props<{ contact: Contact }>()
);
export const favouriteContact = createAction(
  '[Contacts] Favorite Contact',
  props<{ contact: Contact }>()
);
export const favouriteContactSucces = createAction(
  '[Contacts] Favorite Contact Succes',
  props<{ contact: Contact }>()
);
