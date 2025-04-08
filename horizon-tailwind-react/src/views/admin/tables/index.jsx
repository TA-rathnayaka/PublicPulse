import React, { useState } from "react";
import {
  MdPoll,
  MdPolicy,
  MdFileDownload
} from "react-icons/md";
import Card from "components/card";
import PoliciesTable from "./components/PoliciesTable";
import PollsTable from "./components/PollsTable";
import { usePoll } from "context/PollContext";

const Tables = () => {
  const [activeTab, setActiveTab] = useState("policies");
  const { polls, loading: pollsLoading } = usePoll();

  // Sample data for policies - replace with your actual data fetching logic
  const policiesData = [
    {
      id: 1,
      name: "Work from Home Policy",
      description: "Guidelines for remote work arrangements",
      status: "active"
    },
    {
      id: 2,
      name: "Leave Policy",
      description: "Rules and regulations for employee leaves",
      status: "active"
    }
  ];

  const handleDownloadAll = async (type) => {
    try {
      const endpoint = type === 'policies' ? '/api/policies/download' : '/api/polls/download';
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Download failed');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(`Error downloading ${type}:`, error);
      // You might want to show a toast notification here
    }
  };

  return (
    <div className="mt-3">
      <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
        <div className="relative flex items-center justify-between pt-4">
          <div className="flex items-center">
            <button
              onClick={() => setActiveTab("policies")}
              className={`mr-4 flex items-center rounded-lg px-4 py-2 text-sm ${
                activeTab === "policies"
                  ? "bg-brand-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <MdPolicy className="mr-2" />
              Policies
            </button>
            <button
              onClick={() => setActiveTab("polls")}
              className={`flex items-center rounded-lg px-4 py-2 text-sm ${
                activeTab === "polls"
                  ? "bg-brand-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <MdPoll className="mr-2" />
              Polls
            </button>
          </div>
          <button
            onClick={() => handleDownloadAll(activeTab)}
            className="flex items-center rounded-lg bg-brand-500 px-4 py-2 text-sm text-white hover:bg-brand-600"
          >
            <MdFileDownload className="mr-2" />
            Export All {activeTab === "policies" ? "Policies" : "Polls"}
          </button>
        </div>

        <div className="mt-8">
          {activeTab === "policies" ? (
            <PoliciesTable data={policiesData} />
          ) : (
            <PollsTable />
          )}
        </div>
      </Card>
    </div>
  );
};

export default Tables;
