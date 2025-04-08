import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import General from "./General";
import { usePoll } from "context/PollContext";

const PollDetails = () => {
  const { pollId } = useParams();
  const location = useLocation();
  const { getPollById } = usePoll();
  
  // Poll data state
  const [poll, setPoll] = useState(location.state?.poll || null);
  const [loading, setLoading] = useState(false);
  
  // Last updated calculation
  const [lastUpdated, setLastUpdated] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });
  
  // Fetch poll data if not passed via location state
  useEffect(() => {
    const fetchPoll = async () => {
      if (!poll && pollId) {
        setLoading(true);
        try {
          const fetchedPoll = await getPollById(pollId);
          setPoll(fetchedPoll);
        } catch (error) {
          console.error("Error fetching poll:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchPoll();
  }, [pollId, poll, getPollById]);
  
  // Calculate last updated time
  useEffect(() => {
    if (poll && poll.createdAt) {
      const createTime = new Date(poll?.createdAt?.toDate?.() || poll?.createdAt);
      const currentTime = new Date();
      const diffMs = currentTime - createTime;
      
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      setLastUpdated({ days, hours, minutes });
    }
  }, [poll]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-500">Loading poll details...</p>
      </div>
    );
  }
  
  if (!poll) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-500">Poll not found. Please return to the previous page.</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col bg-white dark:bg-navy-800 rounded-xl max-w-6xl mx-auto overflow-hidden transition-all mt-3">
      {/* Main content: Image and Details in columns */}
      <div className="flex flex-col md:flex-row">
        {/* Poll Image Container */}
        <div className="w-full md:w-1/2 p-4">
          <div className="relative h-full w-full rounded-xl overflow-hidden">
            <div className="absolute top-3 right-3 bg-white/20 p-2 rounded-full backdrop-blur-md z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            {poll.imageUrl ? (
              <img 
                src={poll.imageUrl} 
                alt={poll.title} 
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div 
                className="w-full h-full object-cover rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(to right, #4ade80, #22c55e)",
                  minHeight: '400px'
                }}
              >
                <h2 className="text-4xl font-bold text-white">
                  {poll.title || 'Poll'}
                </h2>
              </div>
            )}
          </div>
        </div>
      
        {/* Poll Details */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy-700 dark:text-white mb-6">{poll.title}</h1>
            
            <div className="flex justify-between items-center mb-8">
              {/* Creator Info */}
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 dark:bg-white/10 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Created By</p>
                  <p className="font-semibold text-navy-700 dark:text-white flex items-center">
                    Admin
                    <span className="ml-1 text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </p>
                </div>
              </div>
              
              {/* Number of Options */}
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Options</p>
                  <p className="font-semibold text-blue-600 dark:text-blue-400">
                    {poll.options?.length || 0} options
                  </p>
                </div>
              </div>
            </div>

            {/* Poll description */}
            <div className="mb-8">
              <p className="text-gray-600 dark:text-gray-300">
                {poll.description || 'No description available for this poll.'}
              </p>
            </div>
          </div>
          
          {/* Poll Status Section */}
          <div className="mt-6">
            <div className="p-6 border border-gray-200 dark:border-white/10 rounded-xl mb-6 bg-white dark:bg-navy-700">
              <p className="text-gray-500 dark:text-gray-400 text-center mb-2">Status</p>
              <h2 className="text-2xl font-bold text-navy-700 dark:text-white text-center mb-2">
                {poll.status || 'Active'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Poll ID: {poll.id.substring(0, 8)}...
              </p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-500 dark:text-gray-400 text-center mb-4">Created</p>
              <div className="flex justify-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-navy-700 dark:text-white">{lastUpdated.days}</p>
                  <p className="text-gray-500 dark:text-gray-400">Days</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-navy-700 dark:text-white">{lastUpdated.hours}</p>
                  <p className="text-gray-500 dark:text-gray-400">Hours</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-navy-700 dark:text-white">{lastUpdated.minutes}</p>
                  <p className="text-gray-500 dark:text-gray-400">Mins</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Vote Now
              </button>
              <button className="w-full bg-white hover:bg-gray-100 dark:bg-navy-700 dark:hover:bg-navy-600 text-navy-700 dark:text-white border border-gray-300 dark:border-white/10 font-medium py-3 px-4 rounded-lg transition-colors">
                Share Poll
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* General Component as a full-width row below */}
      <div className="w-full mt-6 px-4 pb-6">
        <General />
      </div>
    </div>
  );
};

export default PollDetails;