import React from "react";
import { MdEdit, MdDelete, MdBarChart } from "react-icons/md";

const PollsTable = () => {
  const polls = []; // Fetch your polls data here

  return (
    <div className="w-full overflow-x-scroll">
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
          {polls.map((poll) => (
            <tr key={poll.id} className="border-b border-gray-200">
              <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">
                {poll.title}
              </td>
              <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">
                {poll.startDate}
              </td>
              <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">
                {poll.endDate}
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
                <button className="mr-2 text-brand-500 hover:text-brand-600">
                  <MdEdit />
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