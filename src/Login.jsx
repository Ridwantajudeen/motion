import React, { useState } from 'react';
import logo from './motion-logo.png'
import { Link } from 'react-router-dom';

function Login() {
   // State to hold form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
// Handle input change
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

// Handle form submission
const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Form submitted:', formData);
  // You can add form validation or sending data to a server here
};

  return(
    <div className='login'>
      <div className='login-card'>
        <div id='login-logo'>
        <Link to='/'><img src={logo} className='login-logo' alt='' /></Link>
          <p>welcome back</p>
        </div >
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

        <button type="submit">Login</button>
      </form>
      <div className='links'>
      <Link to='/signup'>Create account</Link>
      </div>
      </div>
    </div>
  )
}
 
export default Login;
