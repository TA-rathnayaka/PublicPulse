import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listenToOptionVoteCounts, fetchPollById } from "../../backend/pollController";

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
    return timestamp?.seconds
      ? new Date(timestamp.seconds * 1000).toLocaleDateString()
      : "Not Available";
  };

  return (
    <div>

      {pollData ? (
        <>
          {pollData.imageUrl ? (
            <img
              src={pollData.imageUrl}
              alt="Poll Illustration"
              style={{ maxWidth: "100%", height: "auto", marginBottom: "1em" }}
            />
          ) : (
            <p>No image available for this poll.</p>
          )}
          <h2>{pollData.title || "No title Available"}</h2>
          <p><strong>Description:</strong> {pollData.description || "No Description Available"}</p>
          <p><strong>Created on:</strong> {getDateDisplay(pollData.createdDate)}</p>
          <p><strong>Ends on:</strong> {getDateDisplay(pollData.endDate)}</p>
        </>
      ) : (
        <p>Loading poll details...</p>
      )}

      <h2>Option Votes:</h2>
      <ul>
        {Object.entries(optionCounts).map(([optionId, { voteCount = 0, optionText = "Unknown Option" }]) => (
          <li key={optionId}>
            <strong>{optionText}:</strong> {voteCount} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollDetails;
