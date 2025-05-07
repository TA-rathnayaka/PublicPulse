import PolicyCard from "components/card/PolicyCard";
import React, { useEffect } from "react";
import { MdHistory } from "react-icons/md";
import Card from "components/card";
import { usePolicy } from "context/PolicyContext";
import { useAuth } from "context/authContext";
import { useInstituteData } from "context/InstituteContext";

const PolicyHistory = () => {
  const { policies, loading, error, refreshPolicies, policyCache } = usePolicy();
  const { instituteId } = useInstituteData();

  // This dependency array might cause refreshPolicies to be called too often
  // Let's fix the dependency issue by using useCallback in a real implementation
  useEffect(() => {
    // Use a simple boolean to prevent multiple refreshes
    let isMounted = true;
    
    if (isMounted) {
      refreshPolicies();
    }
    
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array, only run once on mount

  console.log("Current policies in state:", policies?.length);
  console.log("Policy cache size:", Object.keys(policyCache || {}).length);

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 md:mt-5">
      <div className="col-span-1 h-fit w-full xl:col-span-1">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          
          <button
            onClick={() => refreshPolicies()}
            className="linear rounded-[10px] bg-brand-900 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"
          >
            Refresh
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <Card
                key={`loading-${index}`}
                extra="flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white"
              >
                <div className="h-48 w-full rounded-xl bg-gray-200 animate-pulse mb-3"></div>
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 animate-pulse mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 w-1/3 bg-gray-200 animate-pulse"></div>
                  <div className="h-10 w-1/4 bg-gray-200 animate-pulse rounded-[20px]"></div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <Card extra="flex items-center justify-center p-6 w-full">
            <div className="text-center">
              <div className="text-xl font-bold text-red-500 mb-2">Error</div>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={() => refreshPolicies()}
                className="mt-4 linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
              >
                Try Again
              </button>
            </div>
          </Card>
        )}

        {/* Empty state */}
        {!loading && !error && (!policies || policies.length === 0) && (
          <Card extra="flex items-center justify-center p-6 w-full">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-700 dark:text-white mb-2">No Policy History</div>
              <p className="text-gray-600">There are no policies in the history yet.</p>
            </div>
          </Card>
        )}

        {/* Policy Grid */}
        {!loading && !error && policies && policies.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {policies.map((policy) => (
              <div key={policy.id} className="policy-card-wrapper">
                <PolicyCard 
                  id={policy.id} 
                
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicyHistory;