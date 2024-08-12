import { openDB } from 'idb';
import { Contact } from '../types';

const dbPromise = openDB('ContactsDB', 1, {
  upgrade(db) {
    db.createObjectStore('contacts', { keyPath: 'id' });
  },
});

export const saveContacts = async (contacts: Contact[]) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('contacts', 'readwrite');
    const store = tx.objectStore('contacts');
    await store.clear(); // Clear existing contacts
    await Promise.all(contacts.map(contact => store.add(contact)));
    await tx.done;
  } catch (error) {
    console.error('Error saving contacts to IndexedDB:', error);
  }
};

export const loadContacts = async (): Promise<Contact[]> => {
  const db = await dbPromise;
  return db.getAll('contacts');
};