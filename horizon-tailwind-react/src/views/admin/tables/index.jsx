import React, { useState } from "react";
import {
  MdPoll,
  MdPolicy,
  MdFileDownload
} from "react-icons/md";
import Card from "components/card";
import PoliciesTable from "./components/PoliciesTable";
import PollsTable from "./components/PollsTable";

const Tables = () => {
  const [activeTab, setActiveTab] = useState("policies");

  // Sample data - replace with your actual data fetching logic
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

  const pollsData = [
    {
      id: 1,
      title: "Employee Satisfaction Survey",
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      status: "active"
    },
    {
      id: 2,
      title: "Work Environment Feedback",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      status: "pending"
    }
  ];

  const exportToCSV = (data, filename) => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);
    const csvRows = [];
    csvRows.push(headers.join(','));
    
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        return `"${value}"`;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
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
            onClick={() => exportToCSV(activeTab === "policies" ? policiesData : pollsData, `${activeTab}.csv`)}
            className="flex items-center rounded-lg bg-brand-500 px-4 py-2 text-sm text-white hover:bg-brand-600"
          >
            <MdFileDownload className="mr-2" />
            Export CSV
          </button>
        </div>

        <div className="mt-8">
          {activeTab === "policies" ? (
            <PoliciesTable data={policiesData} />
          ) : (
            <PollsTable data={pollsData} />
          )}
        </div>
      </Card>
    </div>
  );
};

export default Tables;
