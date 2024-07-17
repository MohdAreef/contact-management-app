// src/components/Header.js
// import React ,{ useContext } from 'react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 
import { AuthContext } from '../contexts/AuthContext';
import {Contacts} from './Contacts'
function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  return (
    <header className='header'>
       <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ minHeight: '10px' }}>
        <a className="navbar-brand" href="/">     <Link to="/contacts" className="text-black mx-2" style={{ textDecoration: 'none' }}>Home</Link></a>
        <Link to="/contacts" className="text-black mx-2" style={{ textDecoration: 'none' }}>Contacts</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          </div>
         
         
          <div className="d-flex justify-content-end">
          
            {/* <Link to="/login" className="text-black mx-2" style={{ textDecoration: 'none' }}>Login</Link>
            
            
            <Link to="/register" className="text-black mx-2" style={{ textDecoration: 'none' }}>Register</Link> */}
            {isAuthenticated ? (
            <button className="btn btn-link text-black mx-2" onClick={logout} style={{ textDecoration: 'none' }}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="text-black mx-2" style={{ textDecoration: 'none' }}>Login</Link>
              <Link to="/register" className="text-black mx-2" style={{ textDecoration: 'none' }}>Register</Link>
            </>
          )}
         </div>
      
      </nav>
      <div className="d-flex justify-content">
        
        
      </div>
      {/* <h2>HELLO</h2> */}
     
    </header>
  );
}

export default Header;
