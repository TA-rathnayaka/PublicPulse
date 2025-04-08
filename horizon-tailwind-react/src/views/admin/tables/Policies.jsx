import React from "react";
import Card from "components/card";
import PoliciesTable from "./components/PoliciesTable";

const Policies = () => {
  return (
    <div className="mt-3">
      <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
        <div className="relative flex items-center justify-between pt-4">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Policies
          </h4>
        </div>

        <div className="mt-8">
          <PoliciesTable />
        </div>
      </Card>
    </div>
  );
};

export default Policies; 