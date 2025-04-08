import React, { useState } from "react";
import { MdDelete, MdBarChart, MdFileDownload } from "react-icons/md";
import { usePoll } from "../../../../context/PollContext";

const PollsTable = () => {
  const { polls, loading, error } = usePoll();
  const [downloadError, setDownloadError] = useState(null);

  const handleDownload = async (pollId) => {
    try {
      setDownloadError(null);
      
      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = `${process.env.REACT_APP_API_URL}/api/export/${pollId}`;
      link.setAttribute('download', `poll-${pollId}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Error downloading poll:', error);
      setDownloadError(error.message || 'Failed to download poll data');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString();
    }
    return timestamp;
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  // Convert polls object to array if it's not already
  const pollsArray = polls ? Object.entries(polls).map(([id, poll]) => ({
    id,
    ...poll
  })) : [];

  return (
    <div className="w-full overflow-x-scroll">
      {downloadError && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
          {downloadError}
        </div>
      )}
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
              Poll Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
              Start Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
              End Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {pollsArray.map((poll) => (
            <tr key={poll.id} className="border-b border-gray-200">
              <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">
                {poll.title}
              </td>
              <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">
                {formatDate(poll.startDate)}
              </td>
              <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">
                {formatDate(poll.endDate)}
              </td>
              <td className="px-6 py-4">
                <span className={`rounded-full px-2 py-1 text-xs ${
                  poll.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : poll.status === 'completed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {poll.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => handleDownload(poll.id)}
                  className="mr-2 text-brand-500 hover:text-brand-600"
                  title="Download CSV"
                >
                  <MdFileDownload />
                </button>
                <button className="mr-2 text-brand-500 hover:text-brand-600">
                  <MdBarChart />
                </button>
                <button className="text-red-500 hover:text-red-600">
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PollsTable; 