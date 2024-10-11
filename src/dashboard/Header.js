import React, { useState, useEffect } from 'react';
import logo from './images/motion-logo.png';
import burger from './images/burger1.JPG';
import { useNavigate } from 'react-router-dom';


function Header() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = document.querySelector('.Header').offsetHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > headerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Main Header */}
      <div
        className="Header"
        style={{
          backgroundImage: `url(${burger})`,
          backgroundSize: 'cover',
          height: '300px',
          filter: 'brightness(0.8)',
        }}
      >
        <div className="head">
          <img src={logo} className="logo" alt="logo" />
          <button onClick={goToLogin} >Login</button>
        </div>
        <div className="location">
          <h1>Where do you want us to deliver to?</h1>
          <input type="text" placeholder="ENTER YOUR ADDRESS HERE" /><br />
          <button>SEARCH</button>
        </div>
      </div>

      {/* Sticky Header */}
      <div className={`sticky-header ${isSticky ? 'visible' : ''}`}>
      <div className="location-stick">
          
          <input type="text-stick" placeholder="ENTER YOUR ADDRESS HERE" /><br />
          <button>SEARCH</button>
        </div>
      </div>

     
    </div>
  );
}

export default Header;
