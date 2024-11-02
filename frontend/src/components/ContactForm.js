// ContactForm.js
import './Body.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { CONTACTS_URL, CONTACT_DETAILS_URL } from '../apiConfig'; // Import URLs

function ContactForm({ contactId, setContactId }) {

    const navigate = useNavigate();
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [showAddContactForm, setShowAddContactForm] = useState(false);
  const handleUpdateContact = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
        console.log(contactId);
      const response = await axios.put(CONTACT_DETAILS_URL(contactId), newContact, config);
    //    setContacts((prevContacts) => [...prevContacts, response.data]);
      setNewContact({ name: '', email: '', phone: '' });
      setShowAddContactForm(false);
    navigate('/contacts')
    //   navigate(-1);
    window.location.reload(); 

    
    } catch (error) {
      console.error('Error adding contact:', error);
      // Handle error as needed
      alert('Failed to update contact. Please try again.');
    }
  };
  const handleCancel = (e) =>{
    e.preventDefault();
    setContactId(false);
    window.location.reload(); 
    navigate('/contacts');
    
    
  } 

  return (
    <div className='add-contact-form-wrapper'>
      <div className='add-contact-form'>
        <h3>Add New Contact</h3>
        <form onSubmit={handleUpdateContact}> 
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Phone: </label>
            <input
              type="text"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              required
            />
          </div>
          <button type="submit">Update Contact</button>
          <button type="button" onClick={handleCancel} >Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
