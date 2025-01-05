import React from "react";
import PropTypes from "prop-types";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../backend/firebase/firebase";
import { useNotifications } from "../../context/NotificationsContext"; // Import your notifications context

const Navbar = ({ imgURL, navbarData }) => {
  const [user] = useAuthState(auth); // Get user directly
  const navigate = useNavigate();
  const { notifications } = useNotifications(); // Use context to get notifications
  const unreadCount = notifications.filter(notification => !notification.isRead).length; // Calculate unread notifications

  const handleImageClick = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  const handleNotificationsClick = () => {
    navigate("/notifications"); // Navigate to the notifications page
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="navbar-title">{navbarData}</div>

        <div className="items">
          <div className="search">
            <SearchOutlinedIcon className="icon" />
            <input type="text" placeholder="Search..." />
          </div>
          
          <NavbarItem 
            icon={<SettingsIcon className="icon" />} 
            onClick={() => navigate("/settings")} // Navigate to settings page
          />
          <NavbarItem 
            icon={<NotificationsNoneOutlinedIcon className="icon" />} 
            counter={unreadCount}
            onClick={handleNotificationsClick} // Navigate to notifications page
          />

          <div className="item">
            {user ? (
              <img
                src={user.photoURL || "adminPannel\src\Assets\logo.png"} // Fallback for avatar
                alt="User Avatar"
                className="avatar"
                onClick={handleImageClick}
              />
            ) : (
              <div onClick={() => navigate("/login")}>Login</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NavbarItem = ({ icon, counter, onClick }) => (
  <div className="item" onClick={onClick}>
    {icon}
    {counter > 0 && <div className="counter">{counter}</div>} {/* Show counter only if greater than 0 */}
  </div>
);

Navbar.propTypes = {
  imgURL: PropTypes.string | null,
  navbarData: PropTypes.string,
};

NavbarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  counter: PropTypes.number,
  onClick: PropTypes.func, // Allow passing a click handler
};

export default React.memo(Navbar);
