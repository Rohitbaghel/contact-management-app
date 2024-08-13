import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contactSlice';
import { Contact, RootState } from '../types';
import { Link } from 'react-router-dom';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch();

  const handleDeleteContact = (id: number) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-gray-800">Contacts</h1>
      <ul className="space-y-4">
        {contacts.map((contact: Contact) => (
          <li key={contact.id} className="bg-white shadow-md rounded px-4 py-4 lg:px-8 lg:py-6">
            <div>
              <h2 className="text-lg lg:text-xl font-semibold mb-2">{contact.name}</h2>
              <p className="text-gray-600 mb-1 text-sm lg:text-base">Email: {contact.email}</p>
              <p className="text-gray-600 mb-1 text-sm lg:text-base">Phone: {contact.phone.countryCode}{contact.phone.number}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Link to={`/contact/${contact.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 text-sm lg:text-base">View Details</Link>
                <Link to={`/edit-contact/${contact.id}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 text-sm lg:text-base">Edit</Link>
                <button onClick={() => handleDeleteContact(contact.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 text-sm lg:text-base">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;