// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

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

// Initialize Firebase Auth and export it
export const auth = getAuth(app);

// Initialize Firestore and export it
export const firestore = getFirestore(app);

// Initialize Firebase Storage and export it (optional, if you plan to use storage)
export const storage = getStorage(app);
