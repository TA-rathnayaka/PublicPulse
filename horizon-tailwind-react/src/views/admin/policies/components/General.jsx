import Card from "components/card";
import React from "react";
import { usePolicy } from "context/PolicyContext";
import { useParams } from "react-router-dom";

const General = () => {
  const { policyId } = useParams();
  const { policyCache } = usePolicy();
  
  // Get the current policy from cache
  const policy = policyCache[policyId] || {};
  
  // Format the creation date if available
  const formatDate = (timestamp) => {
    if (!timestamp) return "Not available";
    const date = new Date(timestamp?.toDate?.() || timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Policy Details
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600 dark:text-gray-300">
          {policy.summary || 
           "This section contains additional details about the policy. Please review all information carefully to ensure compliance with organizational guidelines."}
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600 dark:text-gray-400">Policy Type</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {policy.type || "General"}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {policy.status || "Active"}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600 dark:text-gray-400">Department</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {policy.department || "All Departments"}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600 dark:text-gray-400">Version</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {policy.version || "1.0"}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600 dark:text-gray-400">Created On</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {formatDate(policy.createdAt)}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600 dark:text-gray-400">Effective Date</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {formatDate(policy.effectiveDate)}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;