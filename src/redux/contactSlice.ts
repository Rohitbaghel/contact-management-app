import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../types';
import { saveContacts } from '../utils/db';

const initialState: Contact[] = [];

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      return action.payload;
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      const newState = [...state, action.payload];
      saveContacts(newState);
      return newState;
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      const newState = state.filter(contact => contact.id !== action.payload);
      saveContacts(newState);
      return newState;
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const newState = state.map(contact => 
        contact.id === action.payload.id ? action.payload : contact
      );
      saveContacts(newState);
      return newState;
    },
  },
});

export const { setContacts, addContact, deleteContact, editContact } = contactSlice.actions;
export default contactSlice.reducer;