import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import logo from "../../Assets/logo.png";
import { fetchNotifications as fetchNotificationsFromBackend, markNotificationAsRead } from "../../backend/notifications";

const Navbar = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const notificationsDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const {user, logout} = useAuth();
  
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
  }, [user, fetchUnreadNotifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    navigate("/admin-panel/profile");
    setShowUserDropdown(false);
  };
  
  const handleUserImageClick = () => setShowUserDropdown((prev) => !prev);
  const handleNotificationsClick = () => setShowNotifications((prev) => !prev);
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const handleLogoClick = () => navigate("/");

  return (
    <div className="navbar">
      <div className="wrapper">
        {/* Mobile menu button - only visible on small screens */}
        <div className="mobile-menu-button" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>

        {/* Logo on the left */}
        <div className="logo-container" onClick={handleLogoClick}>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV3vLE7N86m5TSnXrcWKW672mcn6mOMBlWhA&s' alt="PublicPulse" className="navbar-logo" />
          
        </div>

        {/* Desktop menu */}
        <div className="items desktop-menu">
          <div className="search">
            <SearchOutlinedIcon className="icon" />
            <input type="text" placeholder="Search..." />
          </div>

          <NavbarItem 
            icon={<SettingsIcon className="icon" />} 
            onClick={() => navigate("/admin-panel/settings")}
          />
          
          <div className="item notification-item" onClick={handleNotificationsClick} ref={notificationsDropdownRef}>
            <NotificationsNoneOutlinedIcon className="icon" />
            {unreadCount > 0 && <div className="counter">{unreadCount}</div>}
            {showNotifications && (
              <div className="notification-dropdown">
                {notifications.length > 0 ? (
                  [...notifications]
                    .sort((a, b) =>
                      b.createdAt.seconds - a.createdAt.seconds || 
                      b.createdAt.nanoseconds - a.createdAt.nanoseconds
                    )
                    .map((notif, index) => {
                      const type = notif.type;
                      const id = notif.metadata.pollId || notif.metadata.policyId;
                      const photoURL = notif.metadata.photoUrl || logo;
                      const isRead = notif.status === "read";
              
                      const date = new Date(notif.createdAt.seconds * 1000).toLocaleDateString();
              
                      return (
                        <div
                          key={index}
                          className={`notification-item ${isRead ? "read" : "pending"}`}
                          onClick={async () => {
                            navigate(`${type}/${id}`);
                            await setNotificationRead(notif.id);
                          }}
                        >
                          <img
                            src={photoURL}
                            alt="Notification"
                            onError={(e) => (e.target.src = logo)}
                          />
                          <div className="notification-content">
                            <p className="notification-text">{notif.message}</p>
                            <p className="notification-time">{date}</p>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <p className="no-notifications">No new notifications</p>
                )}
              </div>
            )}
          </div>

          <div className="item user-item" ref={userDropdownRef}>
            {user ? (
              <>
                <img
                  src={user.photoURL || logo}
                  alt="User"
                  className="avatar"
                  onClick={handleUserImageClick}
                />
                {showUserDropdown && (
                  <div className="user-dropdown">
                    <div className="dropdown-item" onClick={handleProfileClick}>
                      <PersonIcon className="dropdown-icon" />
                      <span>Profile</span>
                    </div>
                    <div className="dropdown-item" onClick={handleLogout}>
                      <LogoutIcon className="dropdown-icon" />
                      <span>Logout</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="login-button" onClick={() => navigate("/login")}>Login</div>
            )}
          </div>
        </div>

        {/* Mobile menu - only visible when toggled */}
        {mobileMenuOpen && (
          <div className="mobile-menu" ref={mobileMenuRef}>
            <div className="search-mobile">
              <SearchOutlinedIcon className="icon" />
              <input type="text" placeholder="Search..." />
            </div>
            
            <div className="mobile-menu-items">
              <div className="mobile-menu-item" onClick={() => navigate("/admin-panel/settings")}>
                <SettingsIcon className="icon" />
                <span>Settings</span>
              </div>
              
              <div className="mobile-menu-item" onClick={handleNotificationsClick}>
                <NotificationsNoneOutlinedIcon className="icon" />
                <span>Notifications</span>
                {unreadCount > 0 && <div className="counter">{unreadCount}</div>}
              </div>
              
              <div className="mobile-menu-item" onClick={handleProfileClick}>
                <PersonIcon className="icon" />
                <span>Profile</span>
              </div>
              
              <div className="mobile-menu-item" onClick={handleLogout}>
                <LogoutIcon className="icon" />
                <span>Logout</span>
              </div>
            </div>
          </div>
        )}
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

NavbarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  counter: PropTypes.number,
  onClick: PropTypes.func,
};

export default React.memo(Navbar);