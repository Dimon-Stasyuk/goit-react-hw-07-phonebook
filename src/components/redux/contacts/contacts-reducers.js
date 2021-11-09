import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

import * as actions from "./contacts-actions";

const initialItemsState = JSON.parse(
  window.localStorage.getItem("contacts"),
) ?? [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const filterReducer = createReducer("", {
  [actions.filterChange]: (_, { payload }) => payload,
});

const itemsReducer = createReducer(initialItemsState, {
  [actions.addContact]: (state, { payload }) => [...state, payload],
  [actions.removeContact]: (state, { payload }) =>
    state.filter((contact) => contact.id !== payload),
});

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});

export default contactsReducer;
