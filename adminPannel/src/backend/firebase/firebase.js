// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Firebase configuration (your Firebase credentials)
const firebaseConfig = {
  apiKey: "AIzaSyAKZcmEnKmc2Oi3E2JhSaeD7-gk00ACOKk",
  authDomain: "policymaker-ee7e9.firebaseapp.com",
  projectId: "policymaker-ee7e9",
  storageBucket: "policymaker-ee7e9.appspot.com",
  messagingSenderId: "488816724512",
  appId: "1:488816724512:web:f75fdf74e70541d52b0a45",
  measurementId: "G-1KDRBQ2NHM"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

// Export the services to use them in other parts of your app
export { auth, firestore ,storage};
