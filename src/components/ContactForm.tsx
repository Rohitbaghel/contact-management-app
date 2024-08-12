import React from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormData, contactSchema } from '../types/contactSchema';
import { useNavigate } from 'react-router-dom';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  initialData?: Partial<ContactFormData>;
  submitButtonText: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, initialData, submitButtonText }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      name: initialData?.name ?? '',
      email: initialData?.email ?? '',
      phone: {
        countryCode: initialData?.phone?.countryCode ?? '+91',
        number: initialData?.phone?.number ?? ''
      },
      address: {
        street: initialData?.address?.street ?? '',
        city: initialData?.address?.city ?? '',
        zipcode: initialData?.address?.zipcode ?? '',
        geo: {
          lat: initialData?.address?.geo?.lat ?? '',
          lng: initialData?.address?.geo?.lng ?? ''
        }
      }
    }
  });
	
	console.log(initialData, "errors");
	

  const onSubmitWrapper = (data: ContactFormData) => {
    onSubmit(data);
    reset();
    navigate('/');
  };

  const renderInput = (name: keyof ContactFormData | 'address.street' | 'address.city' | 'address.zipcode' | 'phone.number' | 'address.geo.lat' | 'address.geo.lng', type: string, label: string) => (
    <div className="mb-6 relative">
      <input
        {...register(name)}
        type={type}
        id={name}
        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 rounded-lg"
        placeholder={label}
      />
      <label
        htmlFor={name}
        className="absolute left-2 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
      >
        {label}
      </label>
      {getNestedError(errors, name) && <p className="mt-1 text-red-500 text-xs">{getNestedError(errors, name)?.message}</p>}
    </div>
  );

  const getNestedError = (errors: FieldErrors<ContactFormData>, name: string): { message?: string } | undefined => {
    return name.split('.').reduce((error: any, key: string) => error && error[key], errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)} className="max-w-md mx-auto p-8 bg-white">
      {renderInput('name', 'text', 'Name')}
      {renderInput('email', 'email', 'Email')}
      <div className="mb-6 relative">
        <div className="flex gap-x-1">
          <select
            {...register('phone.countryCode')}
            className="h-10 w-1/4 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 rounded-lg"
          >
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>
          <input
            {...register('phone.number')}
            type="tel"
            id="phone.number"
            className="peer h-10 w-3/4 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 rounded-lg"
            placeholder="Phone Number"
          />
          <label
            htmlFor="phone.number"
            className="absolute left-[27%] -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm rounded-lg"
          >
            Phone Number
          </label>
        </div>
        {errors.phone?.countryCode && <p className="mt-1 text-red-500 text-xs">{errors.phone.countryCode.message}</p>}
        {errors.phone?.number && <p className="mt-1 text-red-500 text-xs">{errors.phone.number.message}</p>}
      </div>
      {renderInput('address.street', 'text', 'Street')}
      {renderInput('address.city', 'text', 'City')}
      {renderInput('address.zipcode', 'text', 'Zipcode')}
      <button 
        type="submit" 
        disabled={!isValid}
        className={`w-full py-3 rounded-full font-medium text-white transition duration-200 ${
          isValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {submitButtonText}
      </button>
    </form>
  );
};

export default ContactForm;