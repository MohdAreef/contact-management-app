    import React from 'react';
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import { AuthProvider } from './contexts/AuthContext';
    import './App.css';
    import Header from './components/Header';
    import Login from './components/Login';
    import Register from './components/Register';
    import Contacts from './components/Contacts'; 
    import 'bootstrap/dist/css/bootstrap.min.css';
    import Body from './components/Body';

    function App() {
      return (
        <Router>
        <AuthProvider>
        <div className="App">
          <Header />
        
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/"  element={<Body/>}/>
            <Route path="/contacts" element={<Body/>} />
          </Routes>
        </div>
    </AuthProvider>
      </Router>


      );
    }

    export default App;
