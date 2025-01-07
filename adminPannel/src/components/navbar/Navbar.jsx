import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../backend/firebase/firebase";
import logo from "../../Assets/logo.png";
import { fetchNotifications as fetchNotificationsFromBackend, markNotificationAsRead } from "../../backend/notifications";

const Navbar = ({ navbarData }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const setNotificationRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      
      // After marking as read, filter the notification out from unread ones
      setNotifications((prevNotifications) => {
        const updatedNotifications = prevNotifications.map((notif) => {
          if (notif.id === id) {
            notif.status = "read"; // Update the status of the notification
          }
          return notif;
        });
        const unreadNotifications = updatedNotifications.filter(
          (notif) => notif.status === "pending"
        );
        setUnreadCount(unreadNotifications.length); // Update unread count
        return updatedNotifications;
      });
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  // Fetch notifications from the backend
  const fetchUnreadNotifications = useCallback(async () => {
    if (!user) return;

    try {
      const notifications = await fetchNotificationsFromBackend(user.uid);
      const unreadNotifications = notifications.filter(
        (notif) => notif.status === "pending"
      );
      setUnreadCount(unreadNotifications.length);
      setNotifications(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, [user]); // Only re-run when user changes

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
                    
                    const photoURL = notif.metadata.photoUrl ||logo ;
                    console.log("photo of sender is ",photoURL); // Default photo URL if not available
                    const isRead = notif.status === "read"; // Determine if the notification is read
                    
                    return (
                      <div
                        key={index}
                        className={`notification-item ${isRead ? "read" : "pending"}`}
                        onClick={async () => {
                          navigate(`/${type}/${id}`);
                          await setNotificationRead(notif.id);
                        }}
                      >
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
