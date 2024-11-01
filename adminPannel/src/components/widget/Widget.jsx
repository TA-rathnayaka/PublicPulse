import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom"; 
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CircularProgress from "@mui/material/CircularProgress"; 
import { getDataCount } from "../../backend/widgetsController"; // Consolidated function

const Widget = ({ type }) => {
  const [dataCount, setDataCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const count = await getDataCount(type);
      setDataCount(count);
    } catch (err) {
      setError(err.message || "Error fetching data.");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRetry = () => {
    fetchData();
  };

  const widgetData = {
    users: {
      title: "USERS",
      link: "/users",
      linkText: "See user details",
      backgroundColor: "#f2e4d5",
    },
    polls: {
      title: "POLLS",
      link: "/polls",
      linkText: "View all Polls",
      backgroundColor: "#e7d5e8",
    },
    votes: {
      title: "PARTICIPATION",
      link: "/participation",
      linkText: "View participation details",
      backgroundColor: "#e0f7fa",
    },
  };

  const data = widgetData[type] || {};
  const diff = 20; // Example static value; can be dynamic based on historical data

  return (
    <div className="widget" style={{ backgroundColor: data.backgroundColor }}>
      {loading ? (
        <div className="widgetLoading">
          <CircularProgress size={30} />
        </div>
      ) : error ? (
        <div className="error">
          {error}
          <button onClick={handleRetry} className="retryButton">Retry</button>
        </div>
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
          </div>
        </>
      )}
    </div>
  );
};

export default Widget;
