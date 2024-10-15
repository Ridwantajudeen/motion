import React, { useState } from 'react';
import logo from './motion-logo.png'; // Ensure this path is correct
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebase'; // Import Firestore along with auth
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth'; // Firebase method to create a user
import { setDoc, doc } from 'firebase/firestore'; // Firestore methods to store user data

function Signup() {
  const navigate = useNavigate(); // For redirection after successful signup
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    privacy: false,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate privacy policy agreement and password confirmation
    if (!formData.privacy) {
      setError('You must agree to the privacy policy.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Update the user's profile with first and last name
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`
      });

      // Store user data in Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        role: 'user', // Assign role as 'user'
        createdAt: new Date()
      });

      // Send email verification
      await sendEmailVerification(user);
      
      setSuccessMessage('Account created. Please check your email to verify your account.');

      // Redirect to login page after signup
      navigate('/login'); 

    } catch (error) {
      setError(error.message); // Handle errors from Firebase
    }
  };

  return (
    <div className="signup">
      <div className="signup-card">
        <div id="signup-logo">
        <Link to='/'><img src={logo} className='signup-logo' alt='logo' /></Link>
          <p>Create An Account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label><br />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label><br />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
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
            <label>Phone Number:</label><br />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label><br />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label><br />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="privacy-checkbox">
              <input
                type="checkbox"
                name="privacy"
                checked={formData.privacy}
                onChange={handleChange}
                required
              /> I agree to the privacy policy
            </label>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <div className='links'>
          <p>Already have an account?<Link to='/login'> Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
