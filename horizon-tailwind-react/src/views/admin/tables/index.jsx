import React from "react";
import Card from "components/card";
import PollsTable from "./components/PollsTable";
import PoliciesTable from "./components/PoliciesTable";

const Tables = () => {
  return (
    <div className="mt-3 space-y-6"> {/* Add spacing between cards */}
      {/* Polls Card */}
      <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
        <div className="relative flex items-center justify-between pt-4">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Polls
          </h4>
        </div>
        <div className="mt-6">
          <PollsTable />
        </div>
      </Card>

      {/* Policies Card */}
      <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
        <div className="relative flex items-center justify-between pt-4">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Policies
          </h4>
        </div>
        <div className="mt-6">
          <PoliciesTable />
        </div>
      </Card>
    </div>
  );
};

export default Tables;
