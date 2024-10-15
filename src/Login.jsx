import React, { useState } from 'react';
import logo from './motion-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebase'; // Import Firestore along with auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth function
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions to get user data

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
      // Use Firebase to sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      console.log('User logged in:', user);

      // Fetch user data from Firestore to check their role
      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
      const userData = userDoc.data();

      if (userData.role === 'restaurantOwner') {
        navigate('/restaurant-dashboard'); // Redirect to restaurant owner dashboard
      } else {
        navigate('/user-dashboard'); // Redirect to user dashboard
      }

    } catch (error) {
      setError('Error logging in. Please check your credentials and try again.'); // Error handling
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
