import { createFeature, createSelector } from '@ngrx/store';
import { selectIsFavourite } from 'src/app/store/selectors/router.selectors';
import { Contact } from 'src/contacts/contact';
import { reducer } from '../reducers/contacts.reducer';

const contactsFeature = createFeature({ name: 'contacts', reducer: reducer });

export const { selectEntities, selectLoaded, selectLoading } = contactsFeature;
export const selectContacts = createSelector(selectEntities, (entities) =>
  Object.keys(entities)
    .map((id) => entities[parseInt(id)])
    .sort((p, n) => p.name.localeCompare(n.name))
);
export const selectSearchedContacts = (searchTerm: string) =>
  createSelector(selectContacts, selectIsFavourite, (contacts, isFavourite) => {
    let _contacts: Contact[] = [];
    if (isFavourite) _contacts = contacts.filter((c) => c.favourite);
    else _contacts = contacts;
    return searchMap(_contacts, searchTerm);
  });

export const selectFavouriteContacts = createSelector(
  selectContacts,
  (contacts) => contacts.filter((c) => c.favourite)
);

export const selectContact = (id: number) =>
  createSelector(selectEntities, (entities) => entities[id]);

function searchMap(array: any[], searchTerm: string) {
  return array.filter((elem) => {
    if (!searchTerm) return array;

    for (const prop in elem) {
      if (
        typeof elem[prop] === 'string' &&
        (elem[prop] as string)
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      )
        return true;
    }

    return false;
  });
}
