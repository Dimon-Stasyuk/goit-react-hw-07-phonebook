import { useEffect } from "react";
import "./style.css";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";
import {
  filterChange,
  addContact,
  removeContact,
} from "./components/redux/contacts/contacts-actions";
import { connect } from "react-redux";

function App({
  contacts,
  filter,
  handleFilterChange,
  onAddContact,
  onRemoveContact,
}) {
  const contactFilter = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

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
  contacts: state.contacts.items,
  filter: state.contacts.filter,
});

const mapDispatchToProps = (dispatch) => ({
  handleFilterChange: (event) => dispatch(filterChange(event.target.value)),
  onAddContact: (name, number) => dispatch(addContact(name, number)),
  onRemoveContact: (id) => dispatch(removeContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
