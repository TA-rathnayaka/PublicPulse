

import React, { useState } from "react";
import "./managePolls.scss";
import PollCreation from "../../components/pollCreation/PollCreation";
import PollPage from "../../components/PollPage/PollPage"; // Import PollPage

const ManagePolls = () => {
  const [activeTab, setActiveTab] = useState("polls");

  return (
    <div className="settings-container">
      <div className="tab-container">
        <button
          className={`tab ${activeTab === "polls" ? "active" : ""}`}
          onClick={() => setActiveTab("polls")}
        >
          Polls
        </button>
        <button
          className={`tab ${activeTab === "Create a Poll" ? "active" : ""}`}
          onClick={() => setActiveTab("Create a Poll")}
        >
          Create a Poll
        </button>
      </div>

      <div className="content">
        {activeTab === "polls" ? (
          <PollPage /> // Render PollPage when the "Polls" tab is active
        ) : (
          <PollCreation />
        )}
      </div>
    </div>
  );
};

export default ManagePolls; // Don't forget to export your component



