import React, { useState } from "react";
import "./managePolls.scss";
import PollCreation from "../../components/pollCreation/PollCreation";

const SettingsPage = () => {
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
          <div>
            <h3>Polls</h3>
            <p>Themes and Appearance</p>
            <input
              className="input"
              type="text"
              placeholder="Theme selection"
            />
            <p>Language Settings</p>
            <input
              className="input"
              type="text"
              placeholder="Language selection"
            />
          </div>
        ) : (
          
            <PollCreation />
          
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
