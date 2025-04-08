import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const PoliciesTable = ({data}) => {
  const policies = []; // Fetch your policies data here

  return (
    <div className="w-full overflow-x-scroll">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
              Policy Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
              Description
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
          {data.map((policy) => (
            <tr key={policy.id} className="border-b border-gray-200">
              <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">
                {policy.name}
              </td>
              <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">
                {policy.description}
              </td>
              <td className="px-6 py-4">
                <span className={`rounded-full px-2 py-1 text-xs ${
                  policy.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {policy.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="mr-2 text-brand-500 hover:text-brand-600">
                  <MdEdit />
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

export default PoliciesTable; 