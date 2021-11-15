import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {} from "./contacts-actions";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const { data } = await axios.get("http://localhost:4000/contacts");
    return data;
  },
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact) => {
    const { data } = await axios.post(
      "http://localhost:4000/contacts",
      contact,
    );
    return data;
  },
);

export const removeContact = createAsyncThunk(
  "contacts/removeContact",
  async (id) => {
    await axios.delete(`http://localhost:4000/contacts/${id}`);
    return id;
  },
);
