import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await onLogin({ email, password });
     
      setLoggedIn(true);
    } catch (error) {
     
      console.error('Login error:', error);
      setError('Error Login up. Please check your credentials.');
    }
  };

  if (loggedIn) {
    
    return <Navigate to="/srilanka" />;
  }
  return (
 
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <form onSubmit={handleSubmit} style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login</h2>
      {error && <p style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</p>}
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block' }}>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block' }}>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }} />
      </div>
      <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '3px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Login</button>
    </form>
  </div>

  );
};
 
export default LoginForm;


