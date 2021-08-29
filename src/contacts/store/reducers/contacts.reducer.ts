import { createReducer, on } from '@ngrx/store';
import { Contact } from 'src/contacts/contact';
import * as ContactsActions from '../actions/contacts.actions';

export interface ContactsState {
  entities: {
    [id: number]: Contact;
  };
  loading: boolean;
  loaded: boolean;
  error: string;
}

const initialState: ContactsState = {
  entities: {},
  loaded: false,
  loading: false,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(ContactsActions.loadContacts, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(ContactsActions.loadContactsSucces, (state, { contacts }) => {
    const entities = contacts.reduce(
      (entities: { [id: number]: Contact }, contact: Contact) => {
        return {
          ...entities,
          [contact.id]: contact,
        };
      },
      {
        ...state.entities,
      }
    );
    return { ...state, entities, loaded: true, loading: false };
  }),
  on(ContactsActions.loadContactsFail, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),
  on(
    ContactsActions.addContactSucces,
    ContactsActions.updateContactSucces,
    ContactsActions.favouriteContactSucces,
    (state, { contact }) => {
      const entities = { ...state.entities, [contact.id]: contact };
      return { ...state, entities };
    }
  ),
  on(ContactsActions.removeContactSucces, (state, { contact }) => {
    const { [contact.id]: removed, ...entities } = state.entities;
    return { ...state, entities };
  })
);
