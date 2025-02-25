import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import "./layout.scss";
import { useAuth } from "./context/authContext";
import Forbidden from "./components/forbidden/Forbidden";

const Layout = ({ children }) => {
  const [navbarData, setNavbarData] = useState(null);
  const { user, loading, roleLoading } = useAuth();
  const location = useLocation();

  // Define the routes that are admin-only (using regex for dynamic params)
  const adminRoutes = [
    /^\/admin-panel(\/.*)?$/,
  ];

  // Check if the current route is an admin route
  const isAdminRoute = adminRoutes.some((route) => route.test(location.pathname));

  useEffect(() => {
    // Map the current path to a navbar title
    const pathMapping = {
      "/admin-panel": "Dashboard",
      "/admin-panel/polls": "Polls",
      "/admin-panel/settings": "Settings",
      "/admin-panel/users": "Users",
      "/admin-panel/policies": "Policies",
      "/admin-panel/notifications": "Notifications",
    };

    // Use the longest matching path or fallback to "Dashboard"
    const matchedPath = Object.keys(pathMapping).find((path) =>
      location.pathname.startsWith(path)
    );
    setNavbarData(pathMapping[matchedPath] || "Dashboard");
  }, [location.pathname]);



    return (
      <div className="layout">
        <Sidebar />
        <div className="layoutContainer">
          <Navbar imgURL={user?.photoURL || ""} navbarData={navbarData} />
          <div className="children">{children}</div>
        </div>
      </div>
    );
  }

export default Layout;
