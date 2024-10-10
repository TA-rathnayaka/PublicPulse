import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase Auth import
import { doc, getDoc } from "firebase/firestore"; // Firestore imports
import { auth, firestore } from '../../firebase/firebase'; // Your firebase config file
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // To display error messages
  const navigate = useNavigate();

  // Close login popup
  const handleClose = () => {
    navigate("/"); // Redirect to home page when closing
  };

  // Submit login form
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Debugging: Log the email and password before sending the request
      
      
      // Firebase Authentication: Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("user:", user);
     
      // Check if the user is in the admins collection using the document ID (user.uid)
      const adminDocRef = doc(firestore, "admins", user.uid);
      const adminDocSnapshot = await getDoc(adminDocRef);
  
      if (!adminDocSnapshot.exists()) {
        setError("You are not authorized to access this page.");
        auth.signOut(); // Sign out the user if they are not an admin
      } else {
        // Fetch user details from the users collection if admin
        const userRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userRef);
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          navigate("/", { state: { user: userData } }); // Navigate to home and pass user data
        } else {
          setError("User data not found.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
    }
  };
  

  return (
    <div className="login">
      <div className="loginContainer">
        <button className="closeButton" onClick={handleClose}>
          &times;
        </button>
        <h1 className="title">Login Here</h1>
        {error && <p className="errorMessage">{error}</p>} {/* Display error if any */}
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="loginButton">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
