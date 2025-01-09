import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const dropdownRef = useRef(null); // Reference for the dropdown

  const setNotificationRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prevNotifications) => {
        const updatedNotifications = prevNotifications.map((notif) => {
          if (notif.id === id) notif.status = "read";
          return notif;
        });
        setUnreadCount(updatedNotifications.filter((notif) => notif.status === "pending").length);
        return updatedNotifications;
      });
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const fetchUnreadNotifications = useCallback(async () => {
    if (!user) return;

    try {
      const notifications = await fetchNotificationsFromBackend(user.uid);
      setUnreadCount(notifications.filter((notif) => notif.status === "pending").length);
      setNotifications(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUnreadNotifications();
      const interval = setInterval(fetchUnreadNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Listen for outside clicks
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup
    };
  }, []);

  const handleImageClick = () => navigate("/profile");

  const handleNotificationsClick = () => setShowNotifications((prev) => !prev);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="navbar-title">{navbarData}</div>

        <div className="items">
          <div className="search">
            <SearchOutlinedIcon className="icon" />
            <input type="text" placeholder="Search..." />
          </div>

          <NavbarItem icon={<SettingsIcon className="icon" />} onClick={() => navigate("/settings")} />
          <div className="item" onClick={handleNotificationsClick} ref={dropdownRef}>
            <NotificationsNoneOutlinedIcon className="icon" />
            {unreadCount > 0 && <div className="counter">{unreadCount}</div>}
            {showNotifications && (
              <div className="notification-dropdown">
              {notifications.length > 0 ? (
                [...notifications]
                  .sort((a, b) => 
                    b.createdAt.seconds - a.createdAt.seconds || // Compare seconds first
                    b.createdAt.nanoseconds - a.createdAt.nanoseconds // Compare nanoseconds if seconds are equal
                  )
                  .map((notif, index) => {
                    const type = notif.type;
                    const id = notif.metadata.pollId || notif.metadata.policyId;
                    const photoURL = notif.metadata.photoUrl || logo;
                    const isRead = notif.status === "read";
            
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
                          onError={(e) => (e.target.src = logo)}
                        />
                        <p className="notification-text">{notif.message}</p>
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
