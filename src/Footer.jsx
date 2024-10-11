import React, { useState } from 'react';
import motion from './dashboard/images/Motion-White.png';


function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed email:', email);
    // Here you can handle what happens when the user submits the form (e.g., send data to API)
    setEmail(''); // Clear the input field after submission
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={motion} alt=''/>
        </div>

        <div className="footer-newsletter">
          <h3>Subscribe to our Newsletter</h3>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        <div className="footer-links">
          <ul>
            <li><a href="/#">About Us</a></li>
            <li><a href="/#">Contact</a></li>
            <li><a href="/#">Privacy Policy</a></li><br />
            <li><a href="/#">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Motion. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
