import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState('');
  const [contactDetails, setContactDetails] = useState(null);


  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    const fetchContacts = async () => {
      try {
        // Ensure token is present before making the request
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.get('http://localhost:9080/api/contacts', config);
          setContacts(response.data);
        } else {
          // Handle case where token is not present (e.g., redirect to login)
          console.error('No token found. Redirect to login.');
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
        // Handle error as needed
      }
    };

    fetchContacts();
  }, []); // Empty dependency array ensures useEffect runs once on mount


  const getContactDetails = () => {
    axios.get(`/api/contacts/${contactId}`).then((response) => {
      setContactDetails(response.data);
    });
  };

  const deleteContact = (id) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    axios.delete(`http://localhost:9080/api/contacts/${id}`,config).then(() => {
      setContacts(contacts.filter((contact) => contact._id !== id));
    });
  };

  return (
    <div>
        <div> 

        </div>
       <div>

      <h2>Contacts</h2>
      <input
        type="text"
        placeholder="Enter Contact ID"
        value={contactId}
        onChange={(e) => setContactId(e.target.value)}
      />
      <button onClick={getContactDetails}>Get Contact Details</button>

      <div>
        {contactDetails && (
          <div>
            <h3>Contact Details</h3>
            <p>Name: {contactDetails.name}</p>
            <p>Email: {contactDetails.email}</p>
            <p>Phone: {contactDetails.phone}</p>
          </div>
        )}
      </div>

      <div>
        <h3>All Contacts</h3>
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id}>
              {contact.name} - {contact.phone}
              <button onClick={() => deleteContact(contact._id)}>Delete</button>
              <button onClick={() => {/* Handle update */}}>Update</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
       </div>
  );
}

export default Contacts;
