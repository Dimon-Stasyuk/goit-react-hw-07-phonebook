import { createSelector } from "reselect";

export const getContacts = (state) => state.contacts.items;

export const getFilter = (state) => state.contacts.filter;

export const getIsLoading = (state) => state.contacts.loading;

export const getVisiblesContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  },
);
