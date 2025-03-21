import React from "react";
import PropTypes from "prop-types";
import "./AdminNavbar.scss";

const AdminNavbar = ({ navbarData }) => {
  return (
    <div className="admin-navbar">
      <div className="wrapper">
        <div className="navbar-title">{navbarData}</div>
      </div>
    </div>
  );
};

AdminNavbar.propTypes = {
  navbarData: PropTypes.string,
};

export default AdminNavbar;