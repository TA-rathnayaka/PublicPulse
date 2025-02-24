import React, { useState, useEffect } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import "./layout.scss";
import { useAuth } from "./context/authContext";
import Forbidden from "./components/forbidden/Forbidden";

const Layout = ({ children }) => {
  const [navbarData, setNavbarData] = useState(null);
  const { user, userRole, loading, roleLoading } = useAuth(); 
  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // Get navigate function
  console.log("user role is ",userRole);
  const excludedRoutes = ["/login", "/signup"]; // Routes to exclude from Layout

  useEffect(() => {
    // Set navbarData based on the current path
    if (matchPath("/polls/:pollId", location.pathname)) {
      setNavbarData("Poll Details");
    } else if (matchPath("/policies/:policyId", location.pathname)) {
      setNavbarData("Policy Details");
    } else {
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
      }
    }
  }, [location.pathname]); // Run effect whenever the path changes

  // Exclude Layout for specific routes
  if (excludedRoutes.includes(location.pathname)) {
    return <>{children}</>;
  }

  if (loading || roleLoading) {
    return null; // You can return a loading spinner here if you'd like
  }

  // If no user is authenticated, redirect to login
  if (!user) {
    navigate("/login"); // Use the navigate function here
    return null; // Prevent rendering the rest of the layout
  }

  // If the user doesn't have a role, show Forbidden page
  if (!userRole) {
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
