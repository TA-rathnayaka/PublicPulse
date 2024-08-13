// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

const App = () => {
  return (
    <div >
      <h1>Chathura Dilshantha</h1>
    </div>
  )
}

export default App