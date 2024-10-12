// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDWG8cbBsjDUYiOMRpOfUau8AcOW97pTlI",
  authDomain: "motion-ebfe8.firebaseapp.com",
  projectId: "motion-ebfe8",
  storageBucket: "motion-ebfe8.appspot.com",
  messagingSenderId: "222393818001",
  appId: "1:222393818001:web:5c6d39466476a31c009830",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
