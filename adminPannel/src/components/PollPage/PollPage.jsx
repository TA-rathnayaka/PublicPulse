import React from "react";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import "./pollPage.scss";

const PollPage = () => {
  const pollStats = [
    {
      label: "Recent Polls",
      count: 346,
      icon: <MoneyOutlinedIcon />,
      color: "#f9f1b5",
      borderColor: "#CDAA00", // Border color for Recent Polls
    },
    {
      label: "Active Polls",
      count: 247,
      icon: <HowToVoteOutlinedIcon />,
      color: "#cde4f4",
      borderColor: "#006699", // Border color for Active Polls
    },
    {
      label: "Ended Polls",
      count: 23,
      icon: <PollOutlinedIcon />,
      color: "#f5cbc2",
      borderColor: "#BF2B2B", // Border color for Ended Polls
    },
    {
      label: "Dormant Polls",
      count: 65,
      icon: <CommentOutlinedIcon />,
      color: "#c0f0e0",
      borderColor: "#007E7D", // Border color for Dormant Polls
    },
  ];

  const recentPolls = Array(5).fill({
    title: "Poll 1",
    description: "It is a long established fact",
    votes: "No Votes",
    comments: "Empty",
    status: "Active",
  });

  return (
    <div className="poll-page-container">
      <div className="stats-container">
        {pollStats.map((stat, index) => (
          <div
            key={index}
            className={`stat-item ${stat.label
              .replace(" ", "-")
              .toLowerCase()}`} // Add class based on label
            style={{
              backgroundColor: stat.color,
              borderColor: stat.borderColor,
            }} // Set both background and border colors
          >
            {/* Change icon color based on borderColor */}
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
        <h3>Recent Polls</h3>
        <div className="poll-list">
          {recentPolls.map((poll, index) => (
            <div key={index} className="poll-item">
              <div className="poll-info">
                <PollOutlinedIcon className="poll-icon" />
                <div>
                  <h4>{poll.title}</h4>
                  <p>{poll.description}</p>
                </div>
              </div>
              <div className="poll-details">
                <span>Votes: {poll.votes}</span>
                <span>Comments: {poll.comments}</span>
                <span>Status: {poll.status}</span>
              </div>
              <button className="view-details-button">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PollPage;
