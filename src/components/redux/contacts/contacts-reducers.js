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

// const initialItemsState = JSON.parse(
//   window.localStorage.getItem("contacts"),
// ) ?? [
//   { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
//   { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
//   { id: "id-3", name: "Eden Clements", number: "645-17-79" },
//   { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
// ];

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
