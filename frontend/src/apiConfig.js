const BASE_URL = 'http://localhost:9080/api';
export const CONTACTS_URL = `${BASE_URL}/contacts`;
export const CONTACT_DETAILS_URL = (id) => `${BASE_URL}/contacts/${id}`;
export const LOGIN_URL = `${BASE_URL}/users/login`; // New login URL
export const REGISTER_URL = `${BASE_URL}/users/register`; // New registration URL