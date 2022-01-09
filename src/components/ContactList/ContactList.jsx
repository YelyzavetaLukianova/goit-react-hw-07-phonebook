import PropTypes from 'prop-types';
import ContactListItem from './ContactListItem/ContactListItem';
import * as api from '../../services/api';
import './ContactList.css';

// const fetchContacts = async () => {
//   const contacts = await api.getData(api.API_ENDPOINT);
// };

function ContactList({ filterContacts, handleDelete }) {
  return (
    <ul className="ContactList">
      {filterContacts.map(contact => (
        <ContactListItem
          contact={contact}
          key={contact.id}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  filterContacts: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ContactList;
