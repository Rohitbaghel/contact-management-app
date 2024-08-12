import React from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/contactSlice';
import ContactForm from './ContactForm';
import { ContactFormData } from '../types/contactSchema';

const CreateContactForm: React.FC = () => {
  const dispatch = useDispatch();

  const onSubmit = (data: ContactFormData) => {
    const formattedData = {
      ...data,
      id: Date.now(),
      phone: `${data.phone.countryCode}${data.phone.number}`
    };
    dispatch(addContact(formattedData));
  };

  return (
    <div className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8">
      <ContactForm onSubmit={onSubmit} submitButtonText="Add Contact" />
    </div>
  );
};

export default CreateContactForm;