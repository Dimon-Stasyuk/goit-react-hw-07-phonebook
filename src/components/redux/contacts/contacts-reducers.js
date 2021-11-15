import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import { fetchContacts, addContact } from "./contacts-operations";

import {
  filterChange,
  removeContactSuccess,
  removeContactRequest,
  removeContactError,
} from "./contacts-actions";

const filterReducer = createReducer("", {
  [filterChange]: (_, { payload }) => payload,
});

const itemsReducer = createReducer([], {
  [fetchContacts.fulfilled]: (_, { payload }) => payload,
  [addContact.fulfilled]: (state, { payload }) => [...state, payload],
  [removeContactSuccess]: (state, { payload }) =>
    state.filter((contact) => contact.id !== payload),
});

const loadingReducer = createReducer(false, {
  [addContact.pending]: () => true,
  [addContact.fulfilled]: () => false,
  [addContact.rejected]: () => false,
  [removeContactRequest]: () => true,
  [removeContactSuccess]: () => false,
  [removeContactError]: () => false,
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
