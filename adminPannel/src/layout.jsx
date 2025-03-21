import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import AdminNavbar from "./components/AdminNavbar/AdminNavbar";
import Navbar from "./components/Navbar/Navbar";
import "./layout.scss";
import { useAuth } from "./context/authContext";

const Layout = ({ children }) => {
  const [navbarData, setNavbarData] = useState("Dashboard");
  const { user } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Extract the route name after /admin-panel
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const pageTitle = pathSegments[1]?.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
    setNavbarData(pageTitle || "Dashboard");
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="layout">
      {/* Top Navbar receives navbarData when AdminNavbar is hidden */}
      <div className="top-navbar">
        <Navbar navbarData={isScrolled ? navbarData : ""} showName={true} />
      </div>
      
      {/* Main content area with sidebar and content */}
      <div className="main-content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="layoutContainer">
          {!isScrolled && <AdminNavbar navbarData={navbarData} showName={true}/>}
          <div className="children">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;