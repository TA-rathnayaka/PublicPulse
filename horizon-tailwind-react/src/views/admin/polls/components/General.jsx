import Card from "components/card";
import React from "react";
import { usePoll } from "context/PollContext";
import { useParams } from "react-router-dom";

const General = () => {
  const { pollId } = useParams();
  const { getPollById } = usePoll();
  const [poll, setPoll] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  // Fetch poll data when the component mounts
  React.useEffect(() => {
    const fetchPoll = async () => {
      if (pollId) {
        try {
          const pollData = await getPollById(pollId);
          setPoll(pollData);
        } catch (error) {
          console.error("Error fetching poll:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchPoll();
  }, [pollId, getPollById]);
  
  // Format the creation date if available
  const formatDate = (timestamp) => {
    if (!timestamp) return "Not available";
    const date = typeof timestamp === 'object' && timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Card extra={"w-full h-full p-3"}>
        <div className="flex justify-center items-center h-40">
          <p className="text-lg text-gray-500">Loading poll details...</p>
        </div>
      </Card>
    );
  }

  if (!poll) {
    return (
      <Card extra={"w-full h-full p-3"}>
        <div className="flex justify-center items-center h-40">
          <p className="text-lg text-gray-500">Poll not found</p>
        </div>
      </Card>
    );
  }

  // Calculate total votes
  const totalVotes = poll.options?.reduce((total, optionId) => {
    // In a real application, you would actually fetch the option data
    // For now, just returning a placeholder
    return total + 0; // Would add actual vote count
  }, 0) || 0;

  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Poll Details
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600 dark:text-gray-300">
          {poll.description || 
           "This poll was created to gather feedback from the community. Please participate by selecting your preferred option."}
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600 dark:text-gray-400">Institute ID</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {poll.instituteId || "Not available"}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {poll.status || "Active"}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Options</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {poll.options?.length || 0}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Votes</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {totalVotes}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600 dark:text-gray-400">Created On</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {formatDate(poll.createdAt)}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600 dark:text-gray-400">Notification Status</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {poll.settings?.notifyUsers ? "Notifications Sent" : "No Notifications"}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;