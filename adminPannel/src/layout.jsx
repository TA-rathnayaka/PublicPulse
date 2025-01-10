import React, { useState, useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom"; // Import useLocation
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import "./layout.scss";
import { auth, firestore } from "./backend/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Forbidden from "./components/forbidden/Forbidden";

const Layout = ({ children }) => {
  const [navbarData, setNavbarData] = useState(null);
  const [user, loading, authError] = useAuthState(auth);
  const location = useLocation(); // Get current location

  const excludedRoutes = ["/login", "/signup"]; // Routes to exclude from Layout
  
  useEffect(() => {
    // Set navbarData based on the current path
    if (matchPath("/polls/:pollId", location.pathname)) {
      setNavbarData("Poll Details");
    }
    else if (matchPath("/policies/:policyId", location.pathname)) {
      setNavbarData("Policy Details");
    }
    else
    {
      switch (location.pathname) {
      case "/polls":
        setNavbarData("Polls");
        break;
      case "/":
        setNavbarData("Dashboard");
        break;
      case "/settings":
        setNavbarData("Settings");
        break;
      case "/users":
        setNavbarData("Users");
        break;
      case "/policies":
        setNavbarData("Policies");
        break;
      case "/notifications":
        setNavbarData("Notifications");
        break;
      case "/statistics":
        setNavbarData("Statistics");
        break;
      default:
        setNavbarData("Select a page");
    }}
  }, [location.pathname]); // Run effect whenever the path changes

  // Exclude Layout for specific routes
  if (excludedRoutes.includes(location.pathname)) {
    return <>{children}</>;
  }
  if(loading){
    return null;
  }

  // If the user is not authenticated, show the Forbidden component
  if (!user) {
    return <Forbidden />;
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="layoutContainer">
        <Navbar imgURL={user.photoURL || ""} navbarData={navbarData} />
        <div className="children">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
