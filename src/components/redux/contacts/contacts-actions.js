import shortid from "shortid";
import { createAction } from "@reduxjs/toolkit";

export const filterChange = createAction("contacts/filterChange");

export const removeContact = createAction("contacts/remove");

export const addContact = createAction("contacts/add", (name, number) => ({
  payload: {
    id: shortid.generate(),
    name,
    number,
  },
}));
