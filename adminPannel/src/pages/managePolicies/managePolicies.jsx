import React, { useState } from "react";
import "../managePoll/managePolls.scss";
import PoliciesPage from "../policies/PoliciesPage";
import UploadPolicy from "../policies/UploadPolicy";
import UploadCustomPolicy from "../../components/customPolicy/UploadPolicy";

const ManagePolicies = () => {
  const [activeTab, setActiveTab] = useState("policies"); // Default to "policies"

  return (
    <div className="settings-container">
      <div className="tab-container">
        <button
          className={`tab ${activeTab === "policies" ? "active" : ""}`}
          onClick={() => setActiveTab("policies")}
        >
          Policies
        </button>
        <button
          className={`tab ${activeTab === "createPolicy" ? "active" : ""}`}
          onClick={() => setActiveTab("createPolicy")}
        >
          Create a Policy
        </button>
        <button
          className={`tab ${activeTab === "customPolicy" ? "active" : ""}`}
          onClick={() => setActiveTab("customPolicy")}
        >
          Custom Policy
        </button>
      </div>

      <div className="content">
        {/* Render only one component based on activeTab */}
        {activeTab === "policies" && <PoliciesPage />}
        {activeTab === "createPolicy" && <UploadPolicy />}
        {activeTab === "customPolicy" && <UploadCustomPolicy />}
      </div>
    </div>
  );
};

export default ManagePolicies;
