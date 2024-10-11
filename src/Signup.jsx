import React, { useState } from "react";
import logo from './motion-logo.png';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    privacy: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    privacy: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.phone) newErrors.phone = 'Phone number is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    if (!formData.privacy) {
      newErrors.privacy = 'Please agree to the privacy policy.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form data:', formData);
    }
  };

  return (
    <div className="signup">
      <div className="signup-card">
        <div id="signup-logo">
          <Link to='/'><img src={logo} className="signup-logo" alt="" /></Link>
          <p>Create An Account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label><br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ borderColor: errors.name ? 'red' : 'grey' }}
              required
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div>
            <label>Email:</label><br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ borderColor: errors.email ? 'red' : 'grey' }}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div>
            <label>Phone Number:</label><br />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{ borderColor: errors.phone ? 'red' : 'grey' }}
              required
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>

          <div>
            <label>Password:</label><br />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ borderColor: errors.password ? 'red' : 'grey' }}
              required
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div>
            <label>Confirm Password:</label><br />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ borderColor: errors.confirmPassword ? 'red' : 'grey' }}
              required
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>

          <div>
            <label className="privacy-checkbox">
              <input
                type="checkbox"
                name="privacy"
                checked={formData.privacy}
                onChange={handleChange}
                required
              />
              I agree to the privacy policy
            </label>
            {errors.privacy && <p className="error-message">{errors.privacy}</p>}
          </div>

          <button type="submit">Signup</button>
        </form>
        <div className="links">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
