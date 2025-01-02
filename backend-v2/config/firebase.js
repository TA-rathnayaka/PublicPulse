// firebase.js
const firebase = require('firebase/app');
require('firebase/storage');

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
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

module.exports = { storage };
