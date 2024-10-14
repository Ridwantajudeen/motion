import React, { useEffect, useState } from 'react';
import { auth } from './firebase'; 
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
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
      {user ? (
        isEmailVerified ? (
          <h1>Welcome, {getFirstName(user.displayName)}!</h1>
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
