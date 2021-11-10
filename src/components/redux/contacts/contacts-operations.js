import axios from "axios";
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  removeContactError,
  removeContactRequest,
  removeContactSuccess,
  fetchContactError,
  fetchContactRequest,
  fetchContactSuccess,
} from "./contacts-actions";

export const fetchContacts = () => async (dispatch) => {
  dispatch(fetchContactRequest());

  try {
    const { data } = await axios.get("http://localhost:3004/contacts");

    dispatch(fetchContactSuccess(data));
  } catch (error) {
    dispatch(fetchContactError(error));
  }
};

export const addContact = (name, number) => (dispatch) => {
  const contact = {
    name,
    number,
  };
  dispatch(addContactRequest());

  axios
    .post("http://localhost:3004/contacts", contact)
    .then(({ data }) => {
      console.log(data);
      dispatch(addContactSuccess(data));
    })
    .catch((error) => addContactError(error));
};

export const removeContact = (id) => (dispatch) => {
  dispatch(removeContactRequest());

  axios
    .delete(`http://localhost:3004/contacts/${id}`)
    .then(() => dispatch(removeContactSuccess(id)))
    .catch((error) => () => dispatch(removeContactError(error)));
};

// export default { addContact, removeContact };
