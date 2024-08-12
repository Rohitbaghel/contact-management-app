import axios from "axios";
import { Contact } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchContacts = async (): Promise<Contact[]> => {
	const response = await axios.get<Contact[]>(`${API_URL}/users`);
	return response.data;
};

export const fetchContact = async (id: string): Promise<Contact> => {
	const response = await axios.get<Contact>(`${API_URL}/users/${id}`);
	return response.data;
};
