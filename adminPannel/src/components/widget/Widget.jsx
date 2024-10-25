import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import CircularProgress from "@mui/material/CircularProgress"; // Material UI loader
import { getUserCount, getPollCount, getParticipationCount } from "../../backend/widgetsController"; // Import API functions

const Widget = ({ type }) => {
  const [dataCount, setDataCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track whether the component is mounted
    const fetchData = async () => {
      setLoading(true);
      try {
        let count;
        switch (type) {
          case "user":
            count = await getUserCount(); // Fetch user count
            break;
          case "polls":
            count = await getPollCount(); // Fetch poll count
            break;
          case "participation":
            count = await getParticipationCount(); // Fetch participation count
            break;
          default:
            return;
        }
        
        // Only update state if the component is still mounted
        if (isMounted) {
          setDataCount(count);
        }
      } catch (err) {
        if (isMounted) {
          setError("Error fetching data.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchData();

    // Cleanup function to set isMounted to false
    return () => {
      isMounted = false;
    };
  }, [type]);

  let data;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        link: "/users", // Redirect link for users
        linkText: "See user details",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "polls":
      data = {
        title: "POLLS",
        link: "/polls", // Redirect link for polls
        linkText: "View all Polls",
        icon: (
          <PollOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "participation":
      data = {
        title: "PARTICIPATION",
        link: "/participation", // Redirect link for participation
        linkText: "View participation details",
        icon: (
          <EventAvailableOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      {loading ? (
        <div className="widgetLoading">
          <CircularProgress size={30} />
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">{dataCount}</span>
            {/* Change here to make it look like regular text */}
            <Link to={data.link} className="link" style={{ textDecoration: 'none', color: 'inherit' }}>
              {data.linkText}
            </Link>
          </div>
          <div className="right">
            <div className="percentage positive">
              <KeyboardArrowUpIcon />
              {diff} %
            </div>
            {data.icon}
          </div>
        </>
      )}
    </div>
  );
};

export default Widget;
