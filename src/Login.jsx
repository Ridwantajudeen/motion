import React, { useState } from 'react';
import logo from './motion-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function Login() {
  const navigate = useNavigate();
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
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      // Try to fetch from "users" collection first
      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === 'restaurantOwner') {
          navigate('/restaurant-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        // If not found in "users", check in "restaurants" collection
        const restaurantDoc = await getDoc(doc(firestore, 'restaurants', user.uid));
        if (restaurantDoc.exists()) {
          const restaurantData = restaurantDoc.data();
          if (restaurantData.role === 'restaurant-owner') {
            navigate('/restaurant-dashboard');
          }
        } else {
          setError('User not found in the system.');
        }
      }

    } catch (error) {
      setError('Error logging in. Please check your credentials and try again.');
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
