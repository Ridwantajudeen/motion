import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import logo from './dashboard/images/motion-logo.png';
import { auth, firestore } from './firebase'; 
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth'; // Import email verification
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [restaurants, setRestaurants] = useState([]); // State to hold restaurant data
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); 
        setIsEmailVerified(user.emailVerified); // Check if email is verified
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Fetch restaurants from Firestore
  useEffect(() => {
    const fetchRestaurants = async () => {
      const restaurantCollection = collection(firestore, 'restaurants');
      const restaurantSnapshot = await getDocs(restaurantCollection);
      const restaurantList = restaurantSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRestaurants(restaurantList);
    };

    fetchRestaurants();
  }, []);

  const getFirstName = (displayName) => {
    return displayName ? displayName.split(' ')[0] : '';
  };

  const handleResendVerification = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        setResendMessage('Verification email sent! Please check your inbox.');
      } catch (error) {
        setResendMessage('Error sending verification email: ' + error.message);
      }
    }
  };

  return (
    <div className="dashboard">
      <div>
        <img src={logo} className="logo" alt="logo" />
      </div>
      {user ? (
        isEmailVerified ? (
          <div>
            <h1>Welcome, {getFirstName(user.displayName)}!</h1>
            <h2>Available Restaurants</h2>
            <div className="restaurant-cards">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="restaurant-card">
                  <h3>{restaurant.restaurantName}</h3>
                  <img src={restaurant.imageUrl || "default_image_url.jpg"} alt={restaurant.restaurantName} />
                  <p>Opening Hours: {restaurant.openingHours}</p>
                  {/* Use Link to navigate to the restaurant's menu */}
                  <Link to={`/menu/${restaurant.id}`} className="view-menu-button">
                    View Menu
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h1>Please verify your email to access the dashboard.</h1>
            <button onClick={handleResendVerification}>Resend Verification Email</button>
            {resendMessage && <p>{resendMessage}</p>}
          </div>
        )
      ) : (
        <h1>Welcome to the Dashboard!</h1>
      )}
    </div>
  );
}

export default UserDashboard;
