import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import SriLankaMap from "./SriLankaMap";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./App.css"; 
import Reports from './Reports';



function App() {
  return (
    <Router>
      <AppContent />
      <Footer />
    </Router>
  );
}


function AppContent() {
  const [loggedIn, setLoggedIn] = useState(false); 
  

 

  const handleLogin = async (userData) => {
    try {
     
      const response = await fetch('https://weather-app-backend-jwdt.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        
        setLoggedIn(true);
      } else {
      
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  const handleSignup = async (userData) => {
    try {
      
      const response = await fetch('https://weather-app-backend-jwdt.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        
        setLoggedIn(true);
      } else {
        
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  
  const handleLogout = () => {
    
    console.log('Logging out');
    
    setLoggedIn(false);
    
    window.location.href = '/';
  };
  

  return (
  
      <div className="App">
        <nav>
          <ul className="navbar">
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/srilanka" className="navbar-link">
                Sri Lanka Map
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/signup" className="navbar-link">
                Sign Up
              </Link>
            </li>
            {loggedIn && (
              <li className="navbar-item">
                <Link to="/reports" className="navbar-link">
                  Reports
                </Link>
              </li>
            )}
            <li className="navbar-item navbar-item-right">
              {loggedIn ? (
                <button onClick={handleLogout} className="navbar-link">
                  Logout <i className="fa fa-user-circle"></i>
                </button>
              ) : (
                <Link to="/login" className="navbar-link">
                  Login <i className="fa fa-user-circle"></i>
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/srilanka" element={<SriLankaMap />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupForm onSignup={handleSignup} />} />
          {loggedIn && <Route path="/reports" element={<Reports />} />} 
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; 2024 Sri Lanka Map</p>
      </div>
    </footer>
  );
}


export default App;
