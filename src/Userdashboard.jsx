import React, { useEffect, useState } from 'react';
import { auth } from './firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the user object if the user is logged in
      } else {
        setUser(null); // Set to null if user is not logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <div className="dashboard">
      {user ? (
        <h1>Welcome, {user.displayName || user.email}!</h1>
      ) : (
        <h1>Welcome to the Dashboard!</h1>
      )}
    </div>
  );
}

export default UserDashboard;
