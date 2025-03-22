import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import AdminNavbar from "./components/AdminNavbar/AdminNavbar";
import "./layout.scss";
import { useAuth } from "./context/authContext";
import Navbar from "./components/navbar/Navbar";

const Layout = ({ children }) => {
  const [navbarData, setNavbarData] = useState("Dashboard");
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Extract the route name after /admin-panel
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const pageTitle = pathSegments[1]?.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

    setNavbarData(pageTitle || "Dashboard");
  }, [location.pathname]);

  return (
    <div className="layout">
      {/* Top Navbar that spans entire width */}
      <div className="top-navbar">
        <Navbar />
      </div>
      
      {/* Main content area with sidebar and content */}
      <div className="main-content">
        <Sidebar />
        <div className="layoutContainer">
          <AdminNavbar imgURL={user?.photoURL || ""} navbarData={navbarData} />
          <div className="children">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;