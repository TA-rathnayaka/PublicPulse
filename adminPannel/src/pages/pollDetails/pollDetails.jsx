import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listenToOptionVoteCounts } from "../../backend/pollController"; // Adjust the import path

const PollDetails = () => {
  const { pollId } = useParams();
  const [optionCounts, setOptionCounts] = useState({});

  useEffect(() => {
    if (!pollId) return;

    // Start listening for option vote counts and their texts
    const unsubscribe = listenToOptionVoteCounts(pollId, (updatedCounts) => {
      setOptionCounts(updatedCounts); // Update state with new vote counts and option texts
    });

    // Cleanup the listener when the component unmounts or pollId changes
    return () => {
      unsubscribe(); // Unsubscribe from updates
    };
  }, [pollId]);

  return (
    <div>
      <h1>Poll Details</h1>
      <h2>Option Votes:</h2>
      <ul>
        {Object.entries(optionCounts).map(([optionId, { voteCount, optionText }]) => (
          <li key={optionId}>
            <strong>{optionText}:</strong> {voteCount} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollDetails;
