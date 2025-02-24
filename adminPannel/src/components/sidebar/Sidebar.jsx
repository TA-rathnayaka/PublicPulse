import "./sidebar.scss";
import { useState } from "react"; // Import useState to manage active link state
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PollIcon from "@mui/icons-material/Poll";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Tooltip from "@mui/material/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("/"); // State to track the active link

  // Logout handler
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  // Function to handle link click
  const handleLinkClick = (link) => {
    setActiveLink(link); // Update the active link state
    navigate(`/admin-panel${link}`); // Navigate to the selected link with "/admin-panel" prefix
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">PublicPulse</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li onClick={() => handleLinkClick("/")}>
            <Tooltip title="Dashboard" placement="right">
              <DashboardIcon
                className="icon"
                style={{ color: activeLink === "/" ? "#6439ff" : undefined }}
              />
            </Tooltip>
            <span style={{ color: activeLink === "/" ? "#6439ff" : undefined }}>
              Dashboard
            </span>
          </li>
          <p className="title">MANAGE</p>
          <li onClick={() => handleLinkClick("/users")}>
            <Tooltip title="Users" placement="right">
              <PersonOutlineIcon
                className="icon"
                style={{
                  color: activeLink === "/users" ? "#6439ff" : undefined,
                }}
              />
            </Tooltip>
            <span
              style={{ color: activeLink === "/users" ? "#6439ff" : undefined }}
            >
              Users
            </span>
          </li>
          <li onClick={() => handleLinkClick("/policies")}>
            <Tooltip title="Policies" placement="right">
              <PollIcon
                className="icon"
                style={{
                  color: activeLink === "/policies" ? "#6439ff" : undefined,
                }}
              />
            </Tooltip>
            <span
              style={{
                color: activeLink === "/policies" ? "#6439ff" : undefined,
              }}
            >
              Policies
            </span>
          </li>
          <li onClick={() => handleLinkClick("/polls")}>
            <Tooltip title="Polls" placement="right">
              <ThumbUpIcon
                className="icon"
                style={{
                  color: activeLink === "/polls" ? "#6439ff" : undefined,
                }}
              />
            </Tooltip>
            <span
              style={{ color: activeLink === "/polls" ? "#6439ff" : undefined }}
            >
              Polls
            </span>
          </li>
          <p className="title">ANALYTICS</p>
          <li onClick={() => handleLinkClick("/statistics")}>
            <Tooltip title="Statistics" placement="right">
              <InsertChartIcon
                className="icon"
                style={{
                  color: activeLink === "/statistics" ? "#6439ff" : undefined,
                }}
              />
            </Tooltip>
            <span
              style={{
                color: activeLink === "/statistics" ? "#6439ff" : undefined,
              }}
            >
              Statistics
            </span>
          </li>
          <li onClick={() => handleLinkClick("/notifications")}>
            <Tooltip title="Notifications" placement="right">
              <NotificationsNoneIcon
                className="icon"
                style={{
                  color:
                    activeLink === "/notifications" ? "#6439ff" : undefined,
                }}
              />
            </Tooltip>
            <span
              style={{
                color: activeLink === "/notifications" ? "#6439ff" : undefined,
              }}
            >
              Notifications
            </span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <Tooltip title="System Health" placement="right">
              <SettingsSystemDaydreamOutlinedIcon className="icon" />
            </Tooltip>
            <span>System Health</span>
          </li>
          <li>
            <Tooltip title="Logs" placement="right">
              <PsychologyOutlinedIcon className="icon" />
            </Tooltip>
            <span>Logs</span>
          </li>
          <li onClick={() => handleLinkClick("/settings")}>
            <Tooltip title="Settings" placement="right">
              <SettingsApplicationsIcon
                className="icon"
                style={{
                  color: activeLink === "/settings" ? "#6439ff" : undefined,
                }}
              />
            </Tooltip>
            <span
              style={{
                color: activeLink === "/settings" ? "#6439ff" : undefined,
              }}
            >
              Settings
            </span>
          </li>
          <p className="title">USER</p>
          <li onClick={() => handleLinkClick("/profile")}>
            <Tooltip title="Profile" placement="right">
              <AccountCircleOutlinedIcon
                className="icon"
                style={{
                  color: activeLink === "/profile" ? "#6439ff" : undefined,
                }}
              />
            </Tooltip>
            <Link
              to="/profile"
              style={{
                textDecoration: "none",
                color: activeLink === "/profile" ? "#6439ff" : "inherit",
              }}
            >
              <span>Profile</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <Tooltip title="Logout" placement="right">
              <ExitToAppIcon className="icon" />
            </Tooltip>
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <Tooltip title="Light Mode" placement="top">
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "LIGHT" })}
          ></div>
        </Tooltip>
        <Tooltip title="Dark Mode" placement="top">
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "DARK" })}
          ></div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;
