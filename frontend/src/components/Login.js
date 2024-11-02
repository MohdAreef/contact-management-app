import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

import { CONTACTS_URL, CONTACT_DETAILS_URL ,LOGIN_URL} from '../apiConfig'; // Import URLs

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, { email, password });
      // Save token to local storage
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Redirect to home page
      navigate('/');
      window.location.reload(); 
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '10vh' }}>
      <div className="col-md-6">
        <form className='form' onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1"></label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1"></label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
