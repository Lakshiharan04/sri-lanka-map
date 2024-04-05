import React, { useState } from 'react';


const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      
      return;
    }
    setIsLoading(true); 
    try {
      
      await onSignup({ username, email, password });
     
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      
      console.error('Signup error:', error);
      setError('Error signing up. Please try again later.')
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Sign Up</h2>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block' }}>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }} />
        </div>
        <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '10px', borderRadius: '3px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
