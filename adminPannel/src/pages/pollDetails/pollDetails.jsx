import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listenToOptionVoteCounts, fetchPollById } from "../../backend/pollController";
import "./polldetails.scss";

// const PollDetails = () => {
//   const { pollId } = useParams();
//   const [optionCounts, setOptionCounts] = useState({});
//   const [pollData, setPollData] = useState(null);

//   useEffect(() => {
//     if (!pollId) return;

//     const fetchPollData = async () => {
//       try {
//         const fetchedPoll = await fetchPollById(pollId);
//         setPollData(fetchedPoll);
//       } catch (error) {
//         console.error("Error fetching poll details:", error);
//       }
//     };
//     fetchPollData();

//     const unsubscribe = listenToOptionVoteCounts(pollId, (updatedCounts) => {
//       setOptionCounts(updatedCounts);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [pollId]);

//   const getDateDisplay = (timestamp) => {
//     return timestamp?.seconds
//       ? new Date(timestamp.seconds * 1000).toLocaleDateString()
//       : "Not Available";
//   };

//   const getTotalVotes = () => {
//     return Object.values(optionCounts).reduce((sum, { voteCount = 0 }) => sum + voteCount, 0);
//   };

//   const totalVotes = getTotalVotes();

//   return (
//     <div className="poll-details">
//       {pollData ? (
//         <div className="poll-info">
//           {pollData.imageUrl ? (
//             <img src={pollData.imageUrl} alt="Poll Illustration" />
//           ) : (
//             <p>No image available for this poll.</p>
//           )}
//           <h2>{pollData.title || "No title Available"}</h2>
//           <p><strong>Description:</strong> {pollData.description || "No Description Available"}</p>
//           <p><strong>Created on:</strong> {getDateDisplay(pollData.createdDate)}</p>
//           <p><strong>Ends on:</strong> {getDateDisplay(pollData.endDate)}</p>
//         </div>
//       ) : (
//         <p>Loading poll details...</p>
//       )}
//       <div className="option-votes">
//         <h2>Option Votes:</h2>
//         <ul>
//           {Object.entries(optionCounts).map(([optionId, { voteCount = 0, optionText = "Unknown Option" }]) => {
//             const votePercentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

//             return (
//               <li key={optionId}>
//                 <div className="option-header">
//                   <strong>{optionText}</strong>
//                   <span>{voteCount} votes</span>
//                 </div>
//                 <div className="progress-bar-container">
//                   <div
//                     className="progress-bar"
//                     style={{ width: `${votePercentage}%` }}
//                   />
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default PollDetails;

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

  const getTotalVotes = () => {
    return Object.values(optionCounts).reduce((sum, { voteCount = 0 }) => sum + voteCount, 0);
  };

  const getProgressBarClass = (optionText) => {
    if (optionText.toLowerCase().includes("yes")) return "yes";
    if (optionText.toLowerCase().includes("no")) return "no";
    if (optionText.toLowerCase().includes("undecided")) return "undecided";
    return ""; // Default
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
          <p><strong>Description:</strong> {pollData.description || "No Description Available"}</p>
          <p><strong>Created on:</strong> {getDateDisplay(pollData.createdDate)}</p>
          <p><strong>Ends on:</strong> {getDateDisplay(pollData.endDate)}</p>
        </div>
      ) : (
        <p>Loading poll details...</p>
      )}
      <div className="option-votes">
  <h2 className="section-title">Option Votes:</h2>
  <ul>
    {Object.entries(optionCounts).map(([optionId, { voteCount = 0, optionText = "Unknown Option" }]) => {
      const votePercentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
      const progressBarClass = getProgressBarClass(optionText);

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
            />
          </div>
        </li>
      );
    })}
  </ul>
</div>
    </div>
  );
};

export default PollDetails;