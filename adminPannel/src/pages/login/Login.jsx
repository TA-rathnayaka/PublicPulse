import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../backend/firebase/firebase'; 
import "./login.scss";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, userRole, loading, roleLoading } = useAuth();
  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  // Close login popup
  const handleClose = () => {
    navigate("/"); // Redirect to home page
  };

  // Submit login form
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error before starting

    try {
      // Firebase Authentication: Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Authenticated user:", userCredential.user);
      
      // Let AuthContext handle role checking
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
    }
  };
  if(user){
    navigate('/');
  }

  return (
    <div className="login">
      <div className="loginContainer">
        <button className="closeButton" onClick={handleClose}>
          &times;
        </button>
        <h1 className="title">Admin Login</h1>
        {error && <p className="errorMessage">{error}</p>}
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your admin email"
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
          <button type="submit" className="loginButton" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;