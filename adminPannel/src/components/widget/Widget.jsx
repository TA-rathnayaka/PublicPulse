import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom"; 
import "./widget.scss";
import CircularProgress from "@mui/material/CircularProgress"; 
import { subscribeToDataCount } from "../../backend/widgetsController";

const widgetConfig = {
  user: {
    title: "USERS",
    link: "/users",
    linkText: "See user details",
    backgroundColor: "#f2e4d5",
    collectionName: "users",
  },
  polls: {
    title: "POLLS",
    link: "/polls",
    linkText: "View all Polls",
    backgroundColor: "#e7d5e8",
    collectionName: "polls",
  },
  participation: {
    title: "PARTICIPATION",
    link: "/participation",
    linkText: "View participation details",
    backgroundColor: "#e0f7fa",
    collectionName: "votes",
  },
};

const Widget = ({ type }) => {
  const [dataCount, setDataCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const collectionName = widgetConfig[type]?.collectionName;

    if (!collectionName) return;

    // Set loading to true before subscribing
    setLoading(true);

    const unsubscribe = subscribeToDataCount(collectionName, (count) => {
      setDataCount(count);
      setLoading(false); // Set loading to false after data is fetched
      setError(null); // Reset error state on successful fetch
    }, (err) => {
      setError(err);
      setLoading(false); // Set loading to false even on error
    });

    return () => {
      if (unsubscribe) unsubscribe(); // Clean up the subscription on unmount
    };
  }, [type]);

  const handleRetry = useCallback(() => {
    setLoading(true); // Reset loading state before retrying
    setError(null);   // Clear error state
    const collectionName = widgetConfig[type]?.collectionName;
    if (collectionName) {
      subscribeToDataCount(collectionName, setDataCount, setError);
    }
  }, [type]);

  const data = widgetConfig[type] || {};

  return (
    <div className="widget" style={{ backgroundColor: data.backgroundColor }}>
      {loading && (
        <div className="widgetLoading">
          <CircularProgress size={30} />
        </div>
      )}
      {error && (
        <div className="error">
          {error}
          <button onClick={handleRetry} className="retryButton">Retry</button>
        </div>
      )}
      {!loading && !error && (
        <>
          <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">{dataCount !== null ? dataCount : "No data available"}</span>
            <Link to={data.link} className="link" style={{ textDecoration: 'none', color: 'inherit' }}>
              {data.linkText}
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Widget;
