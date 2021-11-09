import PropTypes from "prop-types";
import { useState } from "react";
import "./ContactForm.css";

export default function ContactForm({ submit, contacts }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const checkName = (name) => {
    return contacts
      .map((contact) => contact.name.toLowerCase())
      .includes(name.toLowerCase());
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (checkName(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    submit(name, number);
    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
  };

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "number":
        setNumber(event.target.value);
        break;
      default:
        return;
    }
  };

  return (
    <form action='' onSubmit={onSubmit}>
      <label>
        Name
        <input
          type='text'
          name='name'
          onChange={handleInputChange}
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
      <label>
        Number
        <input
          type='tel'
          name='number'
          onChange={handleInputChange}
          value={number}
          pattern='\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}'
          title='Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +'
          required
        />
      </label>
      <button type='submit' className='btn'>
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  submit: PropTypes.func,
  name: PropTypes.string,
  number: PropTypes.string,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};
