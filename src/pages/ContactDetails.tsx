import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editContact, deleteContact } from '../redux/contactSlice';
import { Contact, RootState } from '../types';
import ContactForm from '../components/ContactForm';
import { ContactFormData } from '../types/contactSchema';

const ContactDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const contact = useSelector((state: RootState) => 
    state.contacts.find(c => c.id === Number(id))
  );

  if (!contact) return <div className="text-center text-2xl font-bold text-red-500 mt-8">Contact not found</div>;

  const formattedInitialData = {
    ...contact,
    phone: {
      countryCode: contact.phone.slice(0, 2),
      number: contact.phone.slice(2)
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (data: ContactFormData) => {
    const formattedContact = {
      ...data,
      id: contact.id,
      phone: `${data.phone.countryCode}${data.phone.number}`
    };
    dispatch(editContact(formattedContact));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      dispatch(deleteContact(contact.id));
      navigate('/');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className='text-3xl font-bold mb-6 text-gray-800'>Contact Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {isEditing ? (
          <ContactForm 
            onSubmit={handleSave} 
            initialData={formattedInitialData} 
            submitButtonText="Save"
          />
        ) : (
          <div className="space-y-2">
            <p className="text-xl font-semibold">{contact.name}</p>
            <p className="text-gray-600">Email: {contact.email}</p>
            <p className="text-gray-600">Phone: {contact.phone}</p>
            <p className="text-gray-600">
              Address: {contact.address.street}, {contact.address.city}, {contact.address.zipcode}
            </p>
            <div className="mt-4 space-x-2">
              <button 
                onClick={handleEdit} 
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Edit
              </button>
              <button 
                onClick={handleDelete} 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
      <button 
        onClick={() => navigate('/')} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Back to List
      </button>
    </div>
  );
};

export default ContactDetails;