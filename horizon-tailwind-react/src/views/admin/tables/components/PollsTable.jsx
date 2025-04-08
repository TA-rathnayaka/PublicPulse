import React, { useState } from "react";
import { MdDelete, MdBarChart, MdFileDownload } from "react-icons/md";
import { usePoll } from "../../../../context/PollContext";
import axios from "axios";

const PollsTable = () => {
  const { polls, loading, error, deletePoll } = usePoll();
  const [downloadError, setDownloadError] = useState(null);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const trimText = (text, maxLength = 30) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  const getPollStatus = (endDate) => {
    if (!endDate) return 'active';
  
    let end;
    try {
      if (endDate.toDate) {
        end = endDate.toDate(); // Firestore Timestamp
      } else if (typeof endDate === 'number' || typeof endDate === 'string') {
        end = new Date(endDate); // Unix timestamp or ISO string
      } else if (endDate instanceof Date) {
        end = endDate;
      } else {
        return 'unknown';
      }
    } catch {
      return 'unknown';
    }
  
    return end > new Date() ? 'active' : 'completed';
  };
  

  const handleDownload = async (pollId) => {
    try {
      setDownloadError(null);
      setDownloadLoading(true);
      
      const apiBaseUrl = process.env.REACT_APP_BASE_URL || '';
      const apiUrl = `${apiBaseUrl}/api/export/${pollId}`;
      
      console.log("Requesting download from:", apiUrl);
      
      const response = await axios.get(apiUrl, { 
        responseType: "blob" 
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `poll_${pollId}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading poll:', error);
      setDownloadError(error.message || 'Failed to download poll data');
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleDownloadAll = async () => {
    try {
      setDownloadError(null);
      setDownloadLoading(true);
      
      const apiBaseUrl = process.env.REACT_APP_BASE_URL || '';
      const apiUrl = `${apiBaseUrl}/api/export/polls`;
      
      console.log("Requesting download from:", apiUrl);
      
      const response = await axios.get(apiUrl, { 
        responseType: "blob" 
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all_polls.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading all polls:', error);
      setDownloadError(error.message || 'Failed to download all polls');
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleDelete = async (pollId) => {
    if (window.confirm("Are you sure you want to delete this poll? This action cannot be undone.")) {
      try {
        await deletePoll(pollId);
      } catch (error) {
        console.error("Error deleting poll:", error);
        alert("Failed to delete poll. Please try again.");
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    try {
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleDateString();
      }
      
      if (timestamp instanceof Date) {
        return timestamp.toLocaleDateString();
      }
      
      if (typeof timestamp === 'string') {
        return new Date(timestamp).toLocaleDateString();
      }
      
      if (typeof timestamp === 'number') {
        return new Date(timestamp).toLocaleDateString();
      }
    } catch (error) {
      console.warn("Error formatting date:", error);
    }
    
    return String(timestamp);
  };

  if (loading) {
    return <div className="text-center py-4">Loading polls...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  const pollsArray = Array.isArray(polls) ? polls : 
    polls ? Object.entries(polls).map(([id, poll]) => ({
      id,
      ...poll
    })) : [];

  if (pollsArray.length === 0) {
    return <div className="text-center py-4">No polls found. Create your first poll!</div>;
  }

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
          Export All Polls
        </button>
      </div>
      
      {/* Large screen table view */}
      <div className="hidden md:block overflow-x-auto rounded-xl bg-white p-4 shadow-md dark:bg-navy-800">
        <table className="w-full min-w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200 text-xs text-gray-600 dark:text-gray-300">
              <th className="px-4 py-3 text-left font-semibold">Poll Title</th>
              <th className="px-4 py-3 text-left font-semibold">Start Date</th>
              <th className="px-4 py-3 text-left font-semibold">End Date</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pollsArray.map((poll) => (
              <tr
                key={poll.id}
                className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-navy-700"
              >
                <td className="px-4 py-3 text-sm font-medium text-navy-700 dark:text-white max-w-xs">
                  <div className="truncate" title={poll.title}>
                    {trimText(poll.title, 40)}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-navy-700 dark:text-white">
                  {formatDate(poll.startDate || poll.createdAt)}
                </td>
                <td className="px-4 py-3 text-sm text-navy-700 dark:text-white">
                  {formatDate(poll.endDate)}
                </td>
                <td className="px-4 py-3">
                <span
  className={`rounded-full px-2 py-1 text-xs ${
    getPollStatus(poll.endDate) === 'active'
      ? 'bg-green-100 text-green-800 dark:bg-green-200'
      : 'bg-blue-100 text-blue-800 dark:bg-blue-200'
  }`}
>
  {getPollStatus(poll.endDate)}
</span>

                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleDownload(poll.id)}
                      className="p-1 text-brand-500 hover:text-brand-600 hover:bg-gray-100 rounded"
                      title="Download CSV"
                      disabled={downloadLoading}
                    >
                      <MdFileDownload size={18} />
                    </button>
                    <button 
                      className="p-1 text-brand-500 hover:text-brand-600 hover:bg-gray-100 rounded"
                      title="View Analytics"
                    >
                      <MdBarChart size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(poll.id)}
                      className="p-1 text-red-500 hover:text-red-600 hover:bg-red-50 rounded"
                      title="Delete Poll"
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
        {pollsArray.map((poll) => (
          <div key={poll.id} className="rounded-xl bg-white p-4 shadow-md dark:bg-navy-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-navy-700 dark:text-white" title={poll.title}>
                {trimText(poll.title, 25)}
              </h3>
              <span
  className={`rounded-full px-2 py-1 text-xs ${
    getPollStatus(poll.endDate) === 'active'
      ? 'bg-green-100 text-green-800 dark:bg-green-200'
      : 'bg-blue-100 text-blue-800 dark:bg-blue-200'
  }`}
>
  {getPollStatus(poll.endDate)}
</span>


            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
              <div>
                <span className="font-semibold">Start:</span> {formatDate(poll.startDate || poll.createdAt)}
              </div>
              <div>
                <span className="font-semibold">End:</span> {formatDate(poll.endDate)}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 border-t pt-2">
              <button 
                onClick={() => handleDownload(poll.id)}
                className="p-2 text-brand-500 hover:text-brand-600 hover:bg-gray-100 rounded"
                title="Download CSV"
                disabled={downloadLoading}
              >
                <MdFileDownload size={20} />
              </button>
              <button 
                className="p-2 text-brand-500 hover:text-brand-600 hover:bg-gray-100 rounded"
                title="View Analytics"
              >
                <MdBarChart size={20} />
              </button>
              <button 
                onClick={() => handleDelete(poll.id)}
                className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded"
                title="Delete Poll"
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

export default PollsTable;