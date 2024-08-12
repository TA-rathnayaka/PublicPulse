import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./login.scss";

const Login = () => {
  const [isVisible, setIsVisible] = useState(true); // State to manage visibility
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClose = () => {
    setIsVisible(false); // Hide the login popup
    navigate("/"); // Redirect to home page when closing
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    // Add authentication logic here if needed
    navigate("/"); // Redirect to home page upon successful login
  };

  if (!isVisible) return null; // If not visible, render nothing

  return (
    <div className="login">
      <div className="loginContainer">
        <button className="closeButton" onClick={handleClose}>
          &times;
        </button>
        <h1 className="title">Login Here</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
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
