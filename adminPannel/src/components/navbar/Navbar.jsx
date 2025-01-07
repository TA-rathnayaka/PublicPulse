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
  console.log("logo ",logo);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);



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
      setNotifications(notifications); // Store all notifications to display in the dropdown
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
    setShowNotifications(!showNotifications); // Toggle dropdown visibility
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
          <div className="item" onClick={handleNotificationsClick}>
            <NotificationsNoneOutlinedIcon className="icon" />
            {unreadCount > 0 && <div className="counter">{unreadCount}</div>}
            {/* Dropdown toggle on click */}
            {showNotifications && (
  <div className="notification-dropdown">
  {notifications.length > 0 ? (
    notifications.map((notif, index) => {
      // Extract the type and ID (either pollId or policyId)
      const type = notif.type;
      const id = notif.metadata.pollId || notif.metadata.policyId;
      const photoURL = notif.metadata.photoURL || logo; // Default photo URL if not available

      return (
        <div key={index} className="notification-item" onClick={() => navigate(`/${type}/${id}`)}>
          <img 
            src={photoURL} 
            alt="Notification Avatar" 
            onError={(e) => e.target.src = logo} // Set fallback on error
          />
          <p>{notif.message}</p>
          <span>{notif.time}</span>
        </div>
      );
    })
  ) : (
    <p>No new notifications</p>
  )}
</div>

)}

          </div>

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
