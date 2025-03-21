import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listenToOptionVoteCounts, fetchPollById } from "../../backend/pollController";
import "./polldetails.scss";

const PollDetails = () => {
  const { pollId } = useParams();
  const [optionCounts, setOptionCounts] = useState({});
  const [pollData, setPollData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pollId) return;

    const fetchPollData = async () => {
      try {
        setLoading(true);
        const fetchedPoll = await fetchPollById(pollId);
        setPollData(fetchedPoll);
      } catch (error) {
        console.error("Error fetching poll details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPollData();

    const unsubscribe = listenToOptionVoteCounts(pollId, (updatedCounts) => {
      setOptionCounts(updatedCounts);
    });

    return () => unsubscribe();
  }, [pollId]);

  const getDateDisplay = (timestamp) => {
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
    if (votePercentage >= 75) return "progress-bar-high";
    if (votePercentage >= 30) return "progress-bar-medium";
    return "progress-bar-low";
  };

  const totalVotes = getTotalVotes();

  if (loading) {
    return (
      <div className="poll-details-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading poll details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="poll-details-container">
      <div className="poll-card">
        {pollData ? (
          <>
            <div className="poll-header">
              {pollData.imageUrl ? (
                <div className="poll-image-container">
                  <img 
                    src={pollData.imageUrl} 
                    alt={pollData.title || "Poll"} 
                    className="poll-image" 
                  />
                </div>
              ) : (
                <div className="no-image-placeholder">
                  <span className="material-icons">poll</span>
                  <p>No image available</p>
                </div>
              )}
              <h1 className="poll-title">{pollData.title || "No title Available"}</h1>
            </div>

            <div className="poll-metadata">
              <div className="metadata-item">
                <span className="material-icons">description</span>
                <p>{pollData.description || "No Description Available"}</p>
              </div>
              
              <div className="poll-dates">
                <div className="metadata-item">
                  <span className="material-icons">today</span>
                  <p>Created: <span className="date-value">{getDateDisplay(pollData.createdAt)}</span></p>
                </div>
                
                <div className="metadata-item">
                  <span className="material-icons">event</span>
                  <p>Ends: <span className="date-value">{getDateDisplay(pollData.endDate)}</span></p>
                </div>
              </div>
            </div>

            <div className="poll-results-section">
              <h2 className="results-title">
                <span className="material-icons">bar_chart</span>
                Current Results
                <span className="total-votes-badge">{totalVotes} votes</span>
              </h2>

              <div className="options-list">
                {Object.entries(optionCounts).map(
                  ([optionId, { voteCount = 0, optionText = "Unknown Option" }]) => {
                    const votePercentage = totalVotes > 0 
                      ? parseFloat(((voteCount / totalVotes) * 100).toFixed(1)) 
                      : 0;
                    
                    const progressBarClass = getProgressBarClass(votePercentage);

                    return (
                      <div className="option-item" key={optionId}>
                        <div className="option-header">
                          <span className="option-text">{optionText}</span>
                          <span className="vote-count">{voteCount} votes</span>
                        </div>
                        
                        <div className="progress-container">
                          <div 
                            className={`progress-bar ${progressBarClass}`}
                            style={{ width: `${votePercentage}%` }}
                          >
                            {votePercentage > 5 && (
                              <span className="percentage-label">{votePercentage}%</span>
                            )}
                          </div>
                          {votePercentage <= 5 && (
                            <span className="percentage-label-outside">{votePercentage}%</span>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="error-message">
            <span className="material-icons">error_outline</span>
            <p>Unable to load poll data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PollDetails;