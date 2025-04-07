import React, { useState, useEffect } from 'react';
import General from "./General";

const Details = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 20,
    minutes: 37,
    seconds: 49
  });
  
  const [currentBid, setCurrentBid] = useState({
    eth: 2.82,
    usd: 10927.84
  });
  
  const [instantPrice, setInstantPrice] = useState({
    eth: 3.87
  });
  
  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="flex flex-col bg-white dark:bg-navy-800 rounded-xl max-w-6xl mx-auto overflow-hidden transition-all mt-3">
      {/* Main content: Image and Details in columns */}
      <div className="flex flex-col md:flex-row">
        {/* NFT Image Container */}
        <div className="w-full md:w-1/2 p-4">
          <div className="relative h-full w-full rounded-xl overflow-hidden">
            <div className="absolute top-3 right-3 bg-white/20 p-2 rounded-full backdrop-blur-md z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <img 
              src="/api/placeholder/800/800" 
              alt="Color Abstractus NFT" 
              className="w-full h-full object-cover rounded-xl"
              style={{
                background: "linear-gradient(to right, #4ade80, #a78bfa, #ec4899)",
              }}
            />
          </div>
        </div>
      
        {/* NFT Details */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-navy-700 dark:text-white mb-6">Color Abstractus®</h1>
            
            <div className="flex justify-between items-center mb-8">
              {/* Creator */}
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 dark:bg-white/10 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Creator</p>
                  <p className="font-semibold text-navy-700 dark:text-white flex items-center">
                    Simmmple
                    <span className="ml-1 text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </p>
                </div>
              </div>
              
              {/* Instant Price */}
              <div className="flex items-center gap-3">
                <div className="bg-green-100 dark:bg-white/10 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Instant price</p>
                  <p className="font-semibold text-navy-700 dark:text-white flex items-center">
                    {instantPrice.eth} ETH
                    <span className="ml-1 text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bidding Section */}
          <div className="mt-6">
            <div className="p-6 border border-gray-200 dark:border-white/10 rounded-xl mb-6 bg-white dark:bg-navy-700">
              <p className="text-gray-500 dark:text-gray-400 text-center mb-2">Current Bid</p>
              <h2 className="text-5xl font-bold text-navy-700 dark:text-white text-center mb-2">{currentBid.eth} ETH</h2>
              <p className="text-gray-500 dark:text-gray-400 text-center flex items-center justify-center">
                ${currentBid.usd.toLocaleString()}
                <span className="ml-1 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </span>
              </p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-500 dark:text-gray-400 text-center mb-4">Auction ends in</p>
              <div className="flex justify-center gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-navy-700 dark:text-white">{timeLeft.hours}</p>
                  <p className="text-gray-500 dark:text-gray-400">Hrs</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-navy-700 dark:text-white">{timeLeft.minutes}</p>
                  <p className="text-gray-500 dark:text-gray-400">Mins</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-navy-700 dark:text-white">{timeLeft.seconds}</p>
                  <p className="text-gray-500 dark:text-gray-400">Secs</p>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
              Place a bid
            </button>
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

export default Details;