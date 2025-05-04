import { useState, useEffect } from "react";
import Banner from "./components/Banner";
import PollCard from "components/card/PollCard";
import PollHistoryCard from "./components/PollHistoryCard";
import { usePoll } from "context/PollContext";
import Card from "components/card";

const Polls = () => {
  const [pollStatus, setPollStatus] = useState("All");
  const { polls, loading, error, getAllPolls, deletePoll } = usePoll();
  
  useEffect(() => {
    getAllPolls();
  }, []);

  // Make sure we have valid poll data and sort by date
  const validPolls = Array.isArray(polls) ? 
    [...polls].sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt?.seconds ? a.createdAt.seconds * 1000 : a.createdAt);
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt?.seconds ? b.createdAt.seconds * 1000 : b.createdAt);
      return dateB - dateA;
    }) 
    : [];
  

  // Create history data for PollHistoryCard component
  const historyData = validPolls.map((poll) => ({
    id: poll.id,
    imageUrl: poll.imageUrl || null,
    title: poll.title,
    options: poll.options,
    createdAt: poll.createdAt, 
  }));

  // Filter polls based on selected status
  const filteredPolls = pollStatus === "All" 
    ? validPolls 
    : validPolls.filter(poll => poll.status === pollStatus);

  // Get trending and recent polls
  const trendingPolls = filteredPolls.slice(0, 3);
  const recentPolls = filteredPolls.slice(3, 6);

  // Handle poll deletion
  const handleDeletePoll = (pollId) => {
    if (window.confirm("Are you sure you want to delete this poll?")) {
      deletePoll(pollId);
    }
  };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* Poll Banner */}
        <Banner />

        {/* Poll Header */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Institute Polls
          </h4>
          <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
            <li>
              <button
                className={`text-base font-medium ${pollStatus === "All" ? "text-brand-500" : "text-gray-600 dark:text-white"} hover:text-brand-500`}
                onClick={() => setPollStatus("All")}
              >
                All
              </button>
            </li>
            <li>
              <button
                className={`text-base font-medium ${pollStatus === "active" ? "text-brand-500" : "text-gray-600 dark:text-white"} hover:text-brand-500`}
                onClick={() => setPollStatus("active")}
              >
                Active
              </button>
            </li>
            <li>
              <button
                className={`text-base font-medium ${pollStatus === "completed" ? "text-brand-500" : "text-gray-600 dark:text-white"} hover:text-brand-500`}
                onClick={() => setPollStatus("completed")}
              >
                Completed
              </button>
            </li>
            <li>
              <button
                className={`text-base font-medium ${pollStatus === "draft" ? "text-brand-500" : "text-gray-600 dark:text-white"} hover:text-brand-500`}
                onClick={() => setPollStatus("draft")}
              >
                Draft
              </button>
            </li>
          </ul>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-lg text-gray-500">Loading polls...</p>
          </div>
        ) : error ? (
          <Card extra="flex items-center justify-center p-6 w-full">
            <div className="text-center">
              <div className="text-xl font-bold text-red-500 mb-2">Error</div>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={getAllPolls}
                className="mt-4 linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
              >
                Try Again
              </button>
            </div>
          </Card>
        ) : (
          <>
            {/* Featured Polls */}
            <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
              {trendingPolls.length > 0 ? (
                trendingPolls.map((poll) => (
                  <PollCard
                    key={poll.id}
                    imageUrl={poll.imageUrl || null}
                    id={poll.id}
                    title={poll.title || "Untitled Poll"}
                    options={poll.options?.length || 0}
                    createdAt={poll.createdAt}
                    status={poll.status || "active"}
                    onDelete={() => handleDeletePoll(poll.id)}
                  />
                ))
              ) : (
                <div className="col-span-3 flex justify-center items-center h-40">
                  <p className="text-lg text-gray-500">No polls found</p>
                </div>
              )}
            </div>

            {/* Recently Created Polls */}
            {recentPolls.length > 0 && (
              <>
                <div className="mb-4 mt-5 flex items-center justify-between px-4">
                  <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                    Recently Created
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  {recentPolls.map((poll) => (
                    <PollCard
                      key={poll.id}
                      id={poll.id}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <PollHistoryCard historyData={historyData} />
      </div>
    </div>
  );
};

export default Polls;