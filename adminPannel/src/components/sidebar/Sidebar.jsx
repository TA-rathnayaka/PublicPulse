import "./sidebar.scss";
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
import Tooltip from "@mui/material/Tooltip"; // Tooltip for better UX
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();

  // Logout handler

  
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Clear any other session or app-specific data here if needed
        localStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
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
          <div className="Dashboard">
          <Link to={'/'}>
          <li>
            <Tooltip title="Dashboard" placement="right">
              <DashboardIcon className="icon" />
            </Tooltip>
            <span onClick={() => navigate('/')} >Dashboard</span>
          </li>
          </Link>
          </div>
          <p className="title">MANAGE</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <Tooltip title="Users" placement="right">
                <PersonOutlineIcon className="icon" />
              </Tooltip>
              <span>Users</span>
            </li>
          </Link>
          <Link to="/policies" style={{ textDecoration: "none" }}>
            <li>
              <Tooltip title="Policies" placement="right">
                <PollIcon className="icon" />
              </Tooltip>
              <span>Policies</span>
            </li>
          </Link>
          <Link to="/polls" style={{ textDecoration: "none" }}>
            <li>
              <Tooltip title="Polles" placement="right">
                <ThumbUpIcon className="icon" />
              </Tooltip>
              <span>Polls</span>
            </li>
          </Link>
          <p className="title">ANALYTICS</p>
          <Link to="/statistics" style={{ textDecoration: "none" }}>
            <li>
              <Tooltip title="Statistics" placement="right">
                <InsertChartIcon className="icon" />
              </Tooltip>
              <span>Statistics</span>
            </li>
          </Link>
          <Link to="/notifications" style={{ textDecoration: "none" }}>
            <li>
              <Tooltip title="Notifications" placement="right">
                <NotificationsNoneIcon className="icon" />
              </Tooltip>
              <span>Notifications</span>
            </li>
          </Link>
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
          <Link to='/settings'>
          <li>
            <Tooltip title="Settings" placement="right">
              <SettingsApplicationsIcon className="icon" />
            </Tooltip>
            <span>Settings</span>
          </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <Tooltip title="Profile" placement="right">
              <AccountCircleOutlinedIcon className="icon" />
            </Tooltip>
            <span>Profile</span>
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
