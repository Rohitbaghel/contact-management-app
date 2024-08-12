import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editContact } from '../redux/contactSlice';
import { RootState, Contact } from '../types';
import ContactForm from '../components/ContactForm';

const EditContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contact = useSelector((state: RootState) => 
    state.contacts.find(c => c.id === Number(id))
  );

  if (!contact) {
    return <div>Contact not found</div>;
  }

  const handleSubmit = (formData: {
    name: string;
    email: string;
    phone: { number: string; countryCode: string };
    address: Contact['address'];
  }) => {
    dispatch(editContact({
      id: contact.id,
      ...formData,
      phone: {
        countryCode: formData.phone.countryCode,
        number: formData.phone.number
      }
    }));
    navigate('/');
  };

  const formattedContact = {
    name: contact.name,
    email: contact.email,
    phone: {
      countryCode: contact.phone.countryCode,
      number: contact.phone.number
    },
    address: contact.address
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Contact</h1>
      <ContactForm
        onSubmit={handleSubmit}
        initialData={formattedContact}
        submitButtonText="Update Contact"
      />
    </div>
  );
};

export default EditContact;