import { configureStore } from "@reduxjs/toolkit";
import contactReducer, { setContacts } from "./contactSlice";
import { loadContacts } from "../utils/db";

const store = configureStore({
	reducer: {
		contacts: contactReducer
	}
});

loadContacts().then(contacts => {
	store.dispatch(setContacts(contacts));
});

export default store;
