import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import "./layout.scss";
import { useAuth } from "./context/authContext";
import Forbidden from "./components/forbidden/Forbidden";

const Layout = ({ children }) => {
  const [navbarData, setNavbarData] = useState(null);
  const { user, userRole, loading, roleLoading } = useAuth();
  const location = useLocation(); // Get current location

  // Define the routes that are admin-only
  const adminRoutes = [
    "/admin-panel/",
    "/admin-panel/polls",
    "/admin-panel/polls/:pollId",
    "/admin-panel/settings",
    "/admin-panel/users",
    "/admin-panel/users/:userId",
    "/admin-panel/users/new",
    "/admin-panel/policies",
    "/admin-panel/policies/:policyId",
    "/admin-panel/notifications",
  ];

  // Check if the current route is an admin route
  const isAdminRoute = adminRoutes.some((route) => location.pathname.startsWith(route));

  useEffect(() => {
    // Set navbarData based on the current path
    const path = location.pathname;

    // Mapped routes to navbar titles
    const pathMapping = {
      "/admin-panel": "Dashboard",
      "/admin-panel/polls": "Polls",
      "/admin-panel/settings": "Settings",
      "/admin-panel/users": "Users",
      "/admin-panel/policies": "Policies",
      "/admin-panel/notifications": "Notifications",
      "/": "Dashboard",
      "/polls": "Polls",
      "/settings": "Settings",
      "/users": "Users",
      "/policies": "Policies",
      "/notifications": "Notifications",
    };

    // Set the navbar title based on the current path
    setNavbarData(pathMapping[path] || "Dashboard");
  }, [location.pathname]);

  // Check if the current route should render the layout or not
  if (isAdminRoute) {
    if (loading || roleLoading) {
      return null; // You can return a loading spinner here if you'd like
    }

    // Check for permissions to ensure the user has the proper role (admin)


    return (
      <div className="layout">
        <Sidebar />
        <div className="layoutContainer">
          <Navbar imgURL={user.photoURL || ""} navbarData={navbarData} />
          <div className="children">{children}</div>
        </div>
      </div>
    );
  }

  // For non-admin routes, we don't need to wrap them in the layout, just render the children
  return <>{children}</>;
};

export default Layout;
