import React, { useState } from "react";
import { MdBarChart, MdDelete, MdFileDownload } from "react-icons/md";
import axios from "axios";

const PoliciesTable = () => {
  const [downloadError, setDownloadError] = useState(null);
  const [downloadLoading, setDownloadLoading] = useState(false);

  // Replace this with actual API-fetched data
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

  const trimText = (text, maxLength = 30) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const handleDownload = async (policyId) => {
    try {
      setDownloadError(null);
      setDownloadLoading(true);

      const apiBaseUrl = process.env.REACT_APP_API_URL || '';
      const apiUrl = `${apiBaseUrl}/api/export/policy/${policyId}`;
      
      console.log("Requesting download from:", apiUrl);
      
      const response = await axios.get(apiUrl, { 
        responseType: "blob" 
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `policy_${policyId}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading policy:", error);
      setDownloadError(error.message || "Failed to download policy data");
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleDownloadAll = async () => {
    try {
      setDownloadError(null);
      setDownloadLoading(true);

      const apiBaseUrl = process.env.REACT_APP_API_URL || '';
      const apiUrl = `${apiBaseUrl}/api/export/policies`;
      
      console.log("Requesting download from:", apiUrl);
      
      const response = await axios.get(apiUrl, { 
        responseType: "blob" 
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all_policies.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading all policies:", error);
      setDownloadError(error.message || "Failed to download all policies");
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleDelete = (policyId) => {
    if (window.confirm("Are you sure you want to delete this policy? This action cannot be undone.")) {
      try {
        // Add delete functionality here
        console.log("Deleting policy:", policyId);
      } catch (error) {
        console.error("Error deleting policy:", error);
        alert("Failed to delete policy. Please try again.");
      }
    }
  };

  return (
    <div className="w-full">
      {downloadError && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
          {downloadError}
        </div>
      )}
      
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleDownloadAll}
          className="flex items-center rounded-lg bg-brand-500 px-4 py-2 text-sm text-white transition hover:bg-brand-600"
          disabled={downloadLoading}
        >
          <MdFileDownload className="mr-2" />
          Export All Policies
        </button>
      </div>
      
      {/* Large screen table view */}
      <div className="hidden md:block overflow-x-auto rounded-xl bg-white p-4 shadow-md dark:bg-navy-800">
        <table className="w-full min-w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200 text-xs text-gray-600 dark:text-gray-300">
              <th className="px-4 py-3 text-left font-semibold">Policy Name</th>
              <th className="px-4 py-3 text-left font-semibold">Description</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {policiesData.map((policy) => (
              <tr
                key={policy.id}
                className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-navy-700"
              >
                <td className="px-4 py-3 text-sm font-medium text-navy-700 dark:text-white max-w-xs">
                  <div className="truncate" title={policy.name}>
                    {trimText(policy.name, 40)}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-navy-600 dark:text-gray-200 max-w-xs">
                  <div className="truncate" title={policy.description}>
                    {trimText(policy.description, 40)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      policy.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-600"
                    }`}
                  >
                    {policy.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                  <button 
                className="p-2 text-brand-500 hover:text-brand-600 hover:bg-gray-100 rounded"
                title="View Analytics"
              >
                <MdBarChart size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(policy.id)}
                      className="p-1 text-red-500 hover:text-red-600 hover:bg-red-50 rounded"
                      title="Delete Policy"
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile card view */}
      <div className="md:hidden space-y-4">
        {policiesData.map((policy) => (
          <div key={policy.id} className="rounded-xl bg-white p-4 shadow-md dark:bg-navy-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-navy-700 dark:text-white" title={policy.name}>
                {trimText(policy.name, 25)}
              </h3>
              <span className={`rounded-full px-2 py-1 text-xs ${
                policy.status === "active"
                  ? "bg-green-100 text-green-800 dark:bg-green-200"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-600"
              }`}>
                {policy.status}
              </span>
            </div>
            
            <div className="text-xs text-gray-600 mb-3">
              <div title={policy.description}>
                {trimText(policy.description, 100)}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 border-t pt-2">
            <button 
                className="p-2 text-brand-500 hover:text-brand-600 hover:bg-gray-100 rounded"
                title="View Analytics"
              >
                <MdBarChart size={20} />
              </button>
              <button 
                onClick={() => handleDelete(policy.id)}
                className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded"
                title="Delete Policy"
              >
                <MdDelete size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliciesTable;