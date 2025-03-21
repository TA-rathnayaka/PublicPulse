import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  listenToOptionVoteCounts,
  fetchPollById,
} from "../../backend/pollController";
import "./polldetails.scss";
const PollDetails = () => {
  const { pollId } = useParams();
  const [optionCounts, setOptionCounts] = useState({});
  const [pollData, setPollData] = useState(null);

  useEffect(() => {
    if (!pollId) return;

    const fetchPollData = async () => {
      try {
        const fetchedPoll = await fetchPollById(pollId);
        setPollData(fetchedPoll);
      } catch (error) {
        console.error("Error fetching poll details:", error);
      }
    };
    fetchPollData();

    const unsubscribe = listenToOptionVoteCounts(pollId, (updatedCounts) => {
      setOptionCounts(updatedCounts);
    });

    return () => {
      unsubscribe();
    };
  }, [pollId]);

  const getDateDisplay = (timestamp) => {
    console.log("time :",timestamp)
    return timestamp?.seconds
      ? new Date(timestamp.seconds * 1000).toLocaleDateString()
      : "Not Available";
  };

  const getTotalVotes = () => {
    return Object.values(optionCounts).reduce(
      (sum, { voteCount = 0 }) => sum + voteCount,
      0
    );
  };
  const getProgressBarClass = (votePercentage) => {
    console.log('Vote Percentage:', votePercentage);
    // This function can be customized to return different classes based on the option text or other logic.
    if (votePercentage >=75) {
      return "progress-bar-option1";
    }
    if (votePercentage >=30) {
      return "progress-bar-option2";
    }
    return "progress-bar-default";  // Default class for other options
  };
  

  const totalVotes = getTotalVotes();

  return (
    <div className="poll-details">
      {pollData ? (
        <div className="poll-info">
          {pollData.imageUrl ? (
            <img src={pollData.imageUrl} alt="Poll Illustration" />
          ) : (
            <p>No image available for this poll.</p>
          )}
          <h2>{pollData.title || "No title Available"}</h2>
          <p>
            <strong>Description:</strong>{" "}
            {pollData.description || "No Description Available"}
          </p>
          <p>
            <strong>Created on:</strong> {getDateDisplay(pollData.createdAt)}
          </p>
          <p>
            <strong>Ends on:</strong> {getDateDisplay(pollData.endDate)}
          </p>
        </div>
      ) : (
        <p>Loading poll details...</p>
      )}
      <div className="option-votes">
        <h2 className="section-title">Current Results</h2>
        <ul>
          {Object.entries(optionCounts).map(
            ([optionId, { voteCount = 0, optionText = "Unknown Option" }]) => {
              const votePercentage =
  totalVotes > 0 ? parseFloat(((voteCount / totalVotes) * 100).toFixed(4)) : 0;

              const progressBarClass = getProgressBarClass(votePercentage);
              console.log('Class Assigned:', progressBarClass);

              return (
                <li key={optionId}>
                  <div className="option-header">
                    <strong>{optionText}</strong>
                    <span>{voteCount} votes</span>
                  </div>
                  <div className="progress-bar-container">
                    <div
                      className={`progress-bar ${progressBarClass}`}
                      style={{ width: `${votePercentage}%` }}
                    >
                      <span className="progress-bar-text">{votePercentage} %</span>
                    </div>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export default PollDetails;
