import React, { useEffect, useState } from "react";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../backend/firebase/firebase";
import "./pollPage.scss";
import { useNavigate } from "react-router-dom";
import { deletePoll } from "../../backend/pollController";

const PollPage = () => {
  const [recentPolls, setRecentPolls] = useState([]);
  const navigate = useNavigate();
  const [loading,setLoading]=useState(true);

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
        setLoading(false);
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
  if (loading) {
    return (
      <div className="poll-page-container">
        <div className="recent-polls">
          <h3 style={{ marginBottom: "2rem" }}>Recent Polls</h3>
          <div className="poll-list">
            {Array(1)  // Generate 5 loading placeholders for the cards
              .fill()
              .map((_, index) => (
                <div key={index} className="poll-item-loading">
                  <div className="poll-info-loading">
                    <div className="poll-image-loading"></div>
                    <div>
                      <div className="poll-title-loading"></div>
                      <div className="poll-description-loading"></div>
                    </div>
                  </div>
                  <div className="poll-details-list-loading">
                    <div className="poll-details-item-loading"></div>
                    <div className="poll-details-item-loading"></div>
                    <div className="poll-details-item-loading"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
  

  return (
    <div className="poll-page-container">
      

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
            <p className="no-polls">No recent polls available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollPage;
