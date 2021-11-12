import PropTypes from "prop-types";
import "./ContactList.css";
import { connect } from "react-redux";
import { removeContact } from "../redux/contacts/contacts-operations";

const ContactList = ({ contacts, filter, removeContact }) => {
  const contactFilter = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
  return (
    <ul>
      {contactFilter.map(({ name, number, id }) => {
        return (
          <li key={id}>
            <span className='name'> {name}:</span>
            <span className='tel'> {number}</span>
            <button
              type='button'
              className='contact-btn btn'
              onClick={() => removeContact(id)}>
              Удалить
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contacts.items,
  filter: state.contacts.filter,
});

const mapDispatchToProps = (dispatch) => ({
  removeContact: (id) => dispatch(removeContact(id)),
});

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ),
  removeContact: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
