import css from './ContactForm.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ContactForm = ({ handleAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const contact = {
      name,
      number,
    };
    handleAddContact(contact);
    setName('');
    setNumber('');
  };

  const handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    switch (name) {
      case 'name': {
        setName(value);
        return;
      }
      case 'number': {
        setNumber(value);
        return;
      }
      default:
        return;
    }
  };

  return (
    <form className={css.contact_form_cont} onSubmit={handleSubmit}>
      <label>
        <p>Name</p>
        <input
          className={css.contact_form_inp}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Enter name"
          onChange={handleInputChange}
          value={name}
        />
      </label>

      <label>
        <p>Number</p>
        <input
          className={css.contact_form_inp}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Enter number"
          onChange={handleInputChange}
          value={number}
        />
      </label>
      <button type="submit" className={css.contact_form_btn}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  handleAddContact: PropTypes.func,
  name: PropTypes.string,
  number: PropTypes.string,
};

export default ContactForm;
