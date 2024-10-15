import React, { useState } from 'react';
import logo from './motion-logo.png';
import { Link } from 'react-router-dom';
import { auth, firestore } from './firebase'; // Import Firestore along with auth
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth'; // Firebase method to create a user
import { setDoc, doc } from 'firebase/firestore'; // Firestore methods to store restaurant data

function RestaurantSignup() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    cuisineType: '', // Assuming you might want to handle multiple types
    description: '',
    openingHours: '',
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

      // Update user profile with owner's name
      await updateProfile(user, {
        displayName: formData.ownerName
      });

      // Save restaurant details to Firestore under the 'restaurants' collection
      await setDoc(doc(firestore, 'restaurants', user.uid), {
        restaurantName: formData.restaurantName,
        ownerName: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        cuisineType: formData.cuisineType,
        description: formData.description,
        openingHours: formData.openingHours,
        role: 'restaurant-owner', // Assign role as 'restaurant-owner'
        createdAt: new Date(),
      });

      // Send email verification
      await sendEmailVerification(user);

      setSuccessMessage('Restaurant account created. Please verify your email.');
      
      // Optionally, redirect to the dashboard or login page after success
      // navigate('/dashboard'); // Example redirect to a dashboard

    } catch (error) {
      setError(error.message); // Handle errors from Firebase
    }
  };

  return (
    <div className="restaurant-signup">
    <div className="restaurant-signup-card">
        <div id="restaurant-signup-logo">
        <Link to='/'><img src={logo} className='restaurant-signup-logo' alt='logo' /></Link>
        
          <p>Restaurant Signup</p>
        </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="restaurantName"
          placeholder="Restaurant Name"
          value={formData.restaurantName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={formData.ownerName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cuisineType"
          placeholder="Cuisine Type"
          value={formData.cuisineType}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="openingHours"
          placeholder="Opening Hours"
          value={formData.openingHours}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <label className="privacy-checkbox">
          <input
            type="checkbox"
            name="privacy"
            checked={formData.privacy}
            onChange={handleChange}
            required
          /> I agree to the privacy policy
        </label>
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

export default RestaurantSignup;
