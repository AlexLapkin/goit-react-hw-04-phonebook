import { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? [];
    return parsedContacts;
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  const handleAddContact = contact => {
    const finalContacts = {
      ...contact,
      id: nanoid(),
    };

    const hasRepeateContact = contacts.some(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (hasRepeateContact) {
      alert(`${contact.name} is already in contacts!`);
    } else {
      setContacts([finalContacts, ...contacts]);
      //setContacts(prevState =>
      //  [...prevState, finalContacts],
    }
  };

  const changeInputFilter = event => {
    setFilter(event.target.value);
  };

  const findContactsByName = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDeleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} changeInputFilter={changeInputFilter} />
      <ContactList
        contacts={findContactsByName()}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
