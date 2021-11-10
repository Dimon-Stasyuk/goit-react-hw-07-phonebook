import { useEffect } from "react";
import "./style.css";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";
import { filterChange } from "./components/redux/contacts/contacts-actions";
import * as operations from "./components/redux/contacts/contacts-operations";
import { connect } from "react-redux";

function App({
  filter,
  contacts,
  handleFilterChange,
  onAddContact,
  onRemoveContact,
  fetchContacts,
}) {
  const contactFilter = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  console.log(contacts);

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container'>
      <h1>Phoneboock</h1>
      <ContactForm contacts={contacts} submit={onAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={contactFilter} removeContact={onRemoveContact} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  filter: state.contacts.filter,
  contacts: state.contacts.items,
});

const mapDispatchToProps = (dispatch) => ({
  handleFilterChange: (event) => dispatch(filterChange(event.target.value)),
  onAddContact: (name, number) => dispatch(operations.addContact(name, number)),
  onRemoveContact: (id) => dispatch(operations.removeContact(id)),
  fetchContacts: () => dispatch(operations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
