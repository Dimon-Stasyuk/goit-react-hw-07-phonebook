import { useEffect } from "react";
import "./style.css";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";
import { filterChange } from "./components/redux/contacts/contacts-actions";
import * as operations from "./components/redux/contacts/contacts-operations";
import { connect } from "react-redux";
import {
  getContacts,
  getFilter,
} from "./components/redux/contacts/contacts-selectors";

function App({ contacts, fetchContacts }) {
  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container'>
      <h1>Phoneboock</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
}

const mapStateToProps = (state) => ({
  filter: getFilter(state),
  contacts: getContacts(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleFilterChange: (event) => dispatch(filterChange(event.target.value)),

  fetchContacts: () => dispatch(operations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
