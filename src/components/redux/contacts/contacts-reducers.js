import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  removeContact,
} from "./contacts-operations";

import { filterChange } from "./contacts-actions";

const filterReducer = createReducer("", {
  [filterChange]: (_, { payload }) => payload,
});

const itemsReducer = createReducer([], {
  [fetchContacts.fulfilled]: (_, { payload }) => payload,
  [addContact.fulfilled]: (state, { payload }) => [...state, payload],
  [removeContact.fulfilled]: (state, { payload }) =>
    state.filter((contact) => contact.id !== payload),
});

const loadingReducer = createReducer(false, {
  [addContact.pending]: () => true,
  [addContact.fulfilled]: () => false,
  [addContact.rejected]: () => false,
  [removeContact.pending]: () => true,
  [removeContact.fulfilled]: () => false,
  [removeContact.rejected]: () => false,
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,
});

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  loading: loadingReducer,
});

export default contactsReducer;
