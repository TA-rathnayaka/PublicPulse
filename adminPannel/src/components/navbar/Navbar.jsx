import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { auth, firestore } from "../../backend/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";



  
const Navbar = ({ imgURL }) => {
  const user = useAuthState(auth); 
  const navigate = useNavigate(); // Initialize useNavigate

  const handleImageClick = () => {
    navigate("/profile"); // Navigate to the profile page
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="welcomeMessage">welcome</div>
        
        <div className="items">
          <div className="search">
            <SearchOutlinedIcon className="icon" />
            <input type="text" placeholder="Search..." />
          </div>
          
          <div className="item">
            <SettingsIcon className="icon" />
          </div>
          
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          
          <div className="item">
            <img
              src={imgURL} // Use the retrieved image URL
              alt="User Avatar"
              className="avatar"
              onClick={handleImageClick} // Add click handler
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
