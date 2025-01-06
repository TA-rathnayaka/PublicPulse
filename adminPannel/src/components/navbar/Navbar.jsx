import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../backend/firebase/firebase";
import logo from "../../Assets/logo.png";
import { fetchNotifications as fetchNotificationsFromBackend } from "../../backend/notifications";

const Navbar = ({ navbarData }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications from the backend
  const fetchUnreadNotifications = async () => {
    if (!user) return;

    try {
      const notifications = await fetchNotificationsFromBackend(user.uid);

      // Filter notifications with 'pending' status or unread logic
      const unreadNotifications = notifications.filter(
        (notif) => notif.status === "pending"
      );

      setUnreadCount(unreadNotifications.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUnreadNotifications();

      // Poll for updates every 30 seconds if the user is logged in
      const interval = setInterval(fetchUnreadNotifications, 30000);

      return () => clearInterval(interval); // Cleanup interval on unmount or user logout
    }
  }, [user]);

  const handleImageClick = () => {
    navigate("/profile");
  };

  const handleNotificationsClick = () => {
    navigate("/notifications");
    // Optionally, you can mark notifications as read here if needed
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
            onClick={() => navigate("/settings")}
          />
          <NavbarItem
            icon={<NotificationsNoneOutlinedIcon className="icon" />}
            counter={unreadCount}
            onClick={handleNotificationsClick}
          />

          <div className="item">
            {user ? (
              <img
                src={user.photoURL || logo}
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
    {counter > 0 && <div className="counter">{counter}</div>}
  </div>
);

Navbar.propTypes = {
  navbarData: PropTypes.string,
};

NavbarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  counter: PropTypes.number,
  onClick: PropTypes.func,
};

export default React.memo(Navbar);
