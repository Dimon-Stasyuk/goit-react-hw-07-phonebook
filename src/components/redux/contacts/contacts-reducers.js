import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

import {
  filterChange,
  removeContactSuccess,
  removeContactRequest,
  removeContactError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  fetchContactSuccess,
  fetchContactError,
  fetchContactRequest,
} from "./contacts-actions";

const filterReducer = createReducer("", {
  [filterChange]: (_, { payload }) => payload,
});

const itemsReducer = createReducer([], {
  [fetchContactSuccess]: (_, { payload }) => payload,
  [addContactSuccess]: (state, { payload }) => [...state, payload],
  [removeContactSuccess]: (state, { payload }) =>
    state.filter((contact) => contact.id !== payload),
});

const loadingReducer = createReducer(false, {
  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,
  [removeContactRequest]: () => true,
  [removeContactSuccess]: () => false,
  [removeContactError]: () => false,
  [fetchContactRequest]: () => true,
  [fetchContactSuccess]: () => false,
  [fetchContactError]: () => false,
});

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  loading: loadingReducer,
});

export default contactsReducer;
