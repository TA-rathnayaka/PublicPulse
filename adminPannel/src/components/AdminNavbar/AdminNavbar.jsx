import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./AdminNavbar.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext"; 
const AdminNavbar = ({ navbarData }) => {
  
  const navigate = useNavigate();
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [companies, setCompanies] = useState([]);
  const dropdownRef = useRef(null); // Reference for the dropdown
  const { user, instituteName } = useAuth();




  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCompanyDropdown(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Listen for outside clicks
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup
    };
  }, []);

  const handleCompanyClick = () => setShowCompanyDropdown((prev) => !prev);

  const handleCompanySelection = (companyId) => {
    navigate(`/admin-panel/companies/${companyId}`);
    setShowCompanyDropdown(false); // Close the dropdown after selection
  };

  return (
    <div className="admin-navbar">
      <div className="wrapper">
        <div className="navbar-title">{navbarData}</div>

        <div className="items">
          {/* Removed the search and other icons */}
          <div className="item" onClick={handleCompanyClick} ref={dropdownRef}>
            <span className="company-name">{user ? user.companyName : "Company"}</span>
            {showCompanyDropdown && (
              <div className="company-dropdown">
                {companies.length > 0 ? (
                  companies.map((company, index) => (
                    <div
                      key={index}
                      className="company-item"
                      onClick={() => handleCompanySelection(company.id)}
                    >
                      <p>{company.name}</p>
                    </div>
                  ))
                ) : (
                  <p>No companies available</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

AdminNavbar.propTypes = {
  navbarData: PropTypes.string,
};

export default React.memo(AdminNavbar);
