import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Body.css';
import { useNavigate } from 'react-router-dom';

import ContactForm from './ContactForm'; 

function Body() {
  const [contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState('');
  const [contactDetails, setContactDetails] = useState(null);
  const [showAddContactForm, setShowAddContactForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [updatecontact,setupdatecontact]=useState(false);

  const [searchQuery, setSearchQuery] = useState('');
const [filteredContacts, setFilteredContacts] = useState([]);
const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const query = e.target.value.toLowerCase();
    setFilteredContacts(contacts.filter(contact => contact.name.toLowerCase().includes(query)));
  };
  

//   const [contactid,setcontactid]=useState(false);
const token = localStorage.getItem('token');
  const navigate = useNavigate();
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
    axios.delete(`http://localhost:9080/api/contacts/${id}`, config).then(() => {
      setContacts(contacts.filter((contact) => contact._id !== id));
    });
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post('http://localhost:9080/api/contacts', newContact, config);
      setContacts([...contacts, response.data]);
      setNewContact({ name: '', email: '', phone: '' });
      setShowAddContactForm(false);
      navigate('/contacts'); 
      window.location.reload(); 

    } catch (error) {
      console.error('Error adding contact:', error);
      // Handle error as needed
      alert("response");
    }
  };

  const  handleUpdateContact = async (contactid) => {
    // e.preventDefault();
    setupdatecontact(true);
    setContactId(contactid);
    // console.log("inside body",contactId);

  };

  return (
    <div className='body'>
      <div>
        <div className="sidebar">
          <button className='navbutton' onClick={() => setShowAddContactForm(!showAddContactForm)}>
            {showAddContactForm ? 'Close Form' : 'Add Contact'}
          </button>
        </div>
      </div>
  
      {updatecontact && <ContactForm contactId={contactId} setContactId={setContactId} />}
      
      {showAddContactForm ? (
         <div className='add-contact-form-wrapper'>
         <div className='add-contact-form'>
           <h3>Add New Contact</h3> 
           <form onSubmit={handleAddContact}>
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
             <button type="submit">Add Contact</button>
             <button onClick={() => setShowAddContactForm(false)}>Close</button>
           </form>
         </div>
       </div>
      ) : (
        <div className='Contacts'>
          <h2>Contacts</h2>
          
          
          
          {token && (
          <div>
          <input
            type="text"
            placeholder="Search Contacts by Name"
            value={searchQuery}
            onChange={handleSearch}
            className='contactsearch'
          />
        </div>
          )}
          
  
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
            {/* <h3>All Contacts</h3> */}
            {contacts && (
              <div className='ContactDetails'>
                <h3>Name</h3>
                <h3>Email</h3>
                <h3>Phone</h3>
              </div>
            )}
            <div className="scroll-container">
              <ul>
            {!token && <p> Login to view contacts</p> }
                {(searchQuery ? filteredContacts : contacts).map((contact) => (
                  <li key={contact._id}>
                    <div className='mycontacts'>
                      <div className='details'>
                        <p>{contact.name}</p>
                        <p>{contact.email}</p>
                        <p>{contact.phone}</p>
                      </div>
                      <div className='btns'>
                        <button onClick={() => deleteContact(contact._id)} className='delupdatebtn'>Delete</button>
                        <button onClick={() => handleUpdateContact(contact._id)}  className='delupdatebtn'>Update</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
  export default Body;