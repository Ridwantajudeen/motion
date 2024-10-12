import React, { useState } from 'react';
import logo from './motion-logo.png';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate(); // For redirection after successful login
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User logged in:', data);
        navigate('/dashboard'); // Redirect to dashboard after login
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError('Error logging in. Please try again.');
    }
  };

  return (
    <div className="login">
      <div className='login-card'>
        <div id='login-logo'>
          <Link to='/'><img src={logo} className='login-logo' alt='logo' /></Link>
          <p>Welcome Back</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label><br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label><br />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
        <div className='links'>
          <Link to='/signup'>Create account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
