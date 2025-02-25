import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import "./layout.scss";
import { useAuth } from "./context/authContext";

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
      <Sidebar />
      <div className="layoutContainer">
        <Navbar imgURL={user?.photoURL || ""} navbarData={navbarData} />
        <div className="children">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
