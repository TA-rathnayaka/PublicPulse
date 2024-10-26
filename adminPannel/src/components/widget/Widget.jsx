import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import CircularProgress from "@mui/material/CircularProgress"; 
import { getUserCount, getPollCount, getParticipationCount } from "../../backend/widgetsController"; 

const Widget = ({ type }) => {
  const [dataCount, setDataCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 
    const fetchData = async () => {
      setLoading(true);
      try {
        let count;
        switch (type) {
          case "user":
            count = await getUserCount(); 
            break;
          case "polls":
            count = await getPollCount(); 
            break;
          case "participation":
            count = await getParticipationCount(); 
            break;
          default:
            return;
        }
        
        if (isMounted) {
          setDataCount(count);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Error fetching data."); // Improved error handling
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchData();

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
        link: "/users", 
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
        link: "/polls", 
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
        link: "/participation", 
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
            <span className="counter">{dataCount !== null ? dataCount : "No data available"}</span>
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
