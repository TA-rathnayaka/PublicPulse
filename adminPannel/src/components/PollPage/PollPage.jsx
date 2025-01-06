import React, { useEffect, useState } from "react";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../backend/firebase/firebase";
import { storage } from "../../backend/firebase/firebase";
import { ref, deleteObject } from "firebase/storage";
import "./pollPage.scss";
import { useNavigate } from "react-router-dom";
import { deletePoll } from "../../backend/pollController";

const PollPage = () => {
  const [recentPolls, setRecentPolls] = useState([]);
  const navigate = useNavigate();

  // Fetch data from Firebase
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const pollsCollection = collection(firestore, "polls");
        const pollsSnapshot = await getDocs(pollsCollection);
        const pollsData = pollsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecentPolls(pollsData);
        console.log(pollsData);
      } catch (error) {
        console.error("Error fetching polls: ", error);
      }
    };

    fetchPolls();
  }, []);

  // Delete poll function
  const handleDelete = async (pollId, imageUrl) => {
    try {
      await deletePoll(pollId, imageUrl);

      // Re-fetch polls after deletion to update the UI
      const pollsCollection = collection(firestore, "polls");
      const pollsSnapshot = await getDocs(pollsCollection);
      const pollsData = pollsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecentPolls(pollsData);
    } catch (error) {
      console.error("Error deleting poll:", error);
    }
  };

  const pollStats = [
    {
      label: "Recent Polls",
      count: 346,
      icon: <MoneyOutlinedIcon />,
      color: "#f9f1b5",
      borderColor: "#CDAA00",
    },
    {
      label: "Active Polls",
      count: 247,
      icon: <HowToVoteOutlinedIcon />,
      color: "#cde4f4",
      borderColor: "#006699",
    },
    {
      label: "Ended Polls",
      count: 23,
      icon: <PollOutlinedIcon />,
      color: "#f5cbc2",
      borderColor: "#BF2B2B",
    },
    {
      label: "Dormant Polls",
      count: 65,
      icon: <CommentOutlinedIcon />,
      color: "#c0f0e0",
      borderColor: "#007E7D",
    },
  ];

  return (
    <div className="poll-page-container">
      <div className="stats-container">
        {pollStats.map((stat, index) => (
          <div
            key={index}
            className={`stat-item ${stat.label
              .replace(" ", "-")
              .toLowerCase()}`}
            style={{
              backgroundColor: stat.color,
              borderColor: stat.borderColor,
            }}
          >
            {React.cloneElement(stat.icon, {
              style: { color: stat.borderColor },
            })}
            <div className="stat-text" style={{ color: stat.borderColor }}>
              <span>{stat.label}</span>
              <h3>{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-polls">
        <h3 style={{ marginBottom: "2rem" }}>Recent Polls</h3>
        <div className="poll-list">
          {recentPolls.length ? (
            recentPolls.map((poll) => (
              <div key={poll.id} className="poll-item">
                <div className="poll-info">
                  {poll.imageUrl ? (
                    <img
                      src={poll.imageUrl}
                      alt={poll.title}
                      className="poll-image"
                    />
                  ) : (
                    <PollOutlinedIcon className="poll-icon" />
                  )}
                  <div>
                    <h4>{poll.title}</h4>
                    <p>{poll.description}</p>
                  </div>
                </div>

                <div className="poll-details-list">
                  <span>Votes: {poll.votes || "No Votes"}</span>
                  <span>Comments: {poll.comments || "Empty"}</span>
                  <span>Status: {poll.status}</span>
                </div>
                <button
                  className="view-details-button"
                  onClick={() => navigate(`${poll.id}`, { relative: "path" })}
                >
                  View Details
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(poll.id, poll.imageUrl)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No recent polls available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollPage;
