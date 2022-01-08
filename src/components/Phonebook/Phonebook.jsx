import ContactForm from '../ContactForm/ContactForm';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as storage from '../../services/LocalStorage';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import {
  getContacts,
  addContact,
  deleteContact,
} from '../../redux/contacts/contactsOperations';
//????? import contactsOperations from '../../redux/contacts/contactsOperations';

// const { getContacts, addContact, deleteContact } = contactsOperations;

const Phonebook = () => {
  const contacts = useSelector(state => state.contacts.data.items);
  // const loading = useSelector(state => state.loading.data.items);
  // const error = useSelector(state => state.error.data.items);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const addNewContact = newContact => {
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase(),
    );
    if (isDuplicate) {
      return alert(`${newContact.name} is already in contacts`);
    }

    dispatch(addContact(newContact));
  };

  const handleDelete = idToDelete => {
    dispatch(deleteContact(idToDelete));
  };

  const getFilterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const filterContacts = getFilterContacts();

  return (
    <div>
      <div>
        <h1>Phonebook</h1>
        <ContactForm addNewContact={addNewContact} />
        <h2>Contacts</h2>
        <Filter />
      </div>
      {filterContacts.length > 0 && (
        <ContactList
          filterContacts={filterContacts}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Phonebook;
