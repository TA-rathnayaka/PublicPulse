import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import General from "./General";
import { usePolicy } from "context/PolicyContext";

const PolicyDetails = () => {
  const { policyId } = useParams();
  const { getPolicyById } = usePolicy();
  
  // Policy data state
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Last updated calculation
  const [lastUpdated, setLastUpdated] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });
  
  // Fetch policy data
  useEffect(() => {
    const fetchPolicy = async () => {
      if (policyId) {
        setLoading(true);
        try {
          const fetchedPolicy = await getPolicyById(policyId);
          setPolicy(fetchedPolicy);
        } catch (error) {
          console.error("Error fetching policy:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchPolicy();
  }, [policyId, getPolicyById]);
  
  // Calculate last updated time
  useEffect(() => {
    if (policy && policy.updatedAt) {
      const updateTime = new Date(policy?.updatedAt?.toDate?.() || policy?.updatedAt);
      const currentTime = new Date();
      const diffMs = currentTime - updateTime;
      
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      setLastUpdated({ days, hours, minutes });
    }
  }, [policy]);
  
  const handleDownloadPDF = () => {
    if (policy && policy.pdfUrl) {
      // Create an anchor element and set its attributes
      const link = document.createElement('a');
      link.href = policy.pdfUrl;
      link.download = policy.pdfName || `${policy.title}.pdf`;
      
      // Append to the document, click it, and then remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("No PDF available for download");
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-500">Loading policy details...</p>
      </div>
    );
  }
  
  if (!policy) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-500">Policy not found. Please return to the previous page.</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col bg-white dark:bg-navy-800 rounded-xl max-w-6xl mx-auto overflow-hidden transition-all mt-3">
      {/* Main content: Image and Details in columns */}
      <div className="flex flex-col md:flex-row">
        {/* Policy Image Container */}
        <div className="w-full md:w-1/2 p-4">
          <div className="relative h-full w-full rounded-xl overflow-hidden">
            <div className="absolute top-3 right-3 bg-white/20 p-2 rounded-full backdrop-blur-md z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            {policy.imageUrl ? (
              <img 
                src={policy.imageUrl} 
                alt={policy.title} 
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div 
                className="w-full h-full object-cover rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(to right, 
                    ${policy.category === 'HR' ? '#4ade80' : policy.category === 'Finance' ? '#a78bfa' : '#ec4899'}, 
                    ${policy.category === 'HR' ? '#22c55e' : policy.category === 'Finance' ? '#8b5cf6' : '#be185d'})`,
                  minHeight: '400px'
                }}
              >
                <h2 className="text-4xl font-bold text-white">
                  {policy.category || 'Policy'}
                </h2>
              </div>
            )}
          </div>
        </div>
      
        {/* Policy Details */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy-700 dark:text-white mb-6">{policy.title}</h1>
            
            <div className="flex justify-between items-center mb-8">
              {/* Creator */}
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 dark:bg-white/10 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Created By</p>
                  <p className="font-semibold text-navy-700 dark:text-white flex items-center">
                    {policy.createdBy || 'Unknown'}
                    <span className="ml-1 text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </p>
                </div>
              </div>
              
              {/* Policy Category */}
              <div className="flex items-center gap-3">
                <div className={`
                  ${policy.category === 'HR' ? 'bg-green-100 dark:bg-green-900/30' : 
                    policy.category === 'Finance' ? 'bg-purple-100 dark:bg-purple-900/30' : 
                    policy.category === 'IT' ? 'bg-blue-100 dark:bg-blue-900/30' : 
                    'bg-gray-100 dark:bg-white/10'} 
                  rounded-full p-2`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`
                    h-6 w-6 
                    ${policy.category === 'HR' ? 'text-green-500 dark:text-green-400' : 
                      policy.category === 'Finance' ? 'text-purple-500 dark:text-purple-400' : 
                      policy.category === 'IT' ? 'text-blue-500 dark:text-blue-400' : 
                      'text-gray-500 dark:text-white'}`} 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Category</p>
                  <p className={`
                    font-semibold
                    ${policy.category === 'HR' ? 'text-green-600 dark:text-green-400' : 
                      policy.category === 'Finance' ? 'text-purple-600 dark:text-purple-400' : 
                      policy.category === 'IT' ? 'text-blue-600 dark:text-blue-400' : 
                      'text-navy-700 dark:text-white'}`}>
                    {policy.category || 'General'}
                  </p>
                </div>
              </div>
            </div>

            {/* Policy description */}
            <div className="mb-8">
              <p className="text-gray-600 dark:text-gray-300">
                {policy.description || 'No description available for this policy.'}
              </p>
            </div>
            
            {/* Policy dates */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {policy.effectiveDate && (
                <div className="bg-gray-50 dark:bg-navy-700 p-4 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Effective Date</p>
                  <p className="font-semibold text-navy-700 dark:text-white">
                    {new Date(policy.effectiveDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              
              {policy.expiryDate && (
                <div className="bg-gray-50 dark:bg-navy-700 p-4 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Expiry Date</p>
                  <p className="font-semibold text-navy-700 dark:text-white">
                    {new Date(policy.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              
              {policy.approvalDate && (
                <div className="bg-gray-50 dark:bg-navy-700 p-4 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Approval Date</p>
                  <p className="font-semibold text-navy-700 dark:text-white">
                    {new Date(policy.approvalDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              
              {policy.approvedBy && (
                <div className="bg-gray-50 dark:bg-navy-700 p-4 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Approved By</p>
                  <p className="font-semibold text-navy-700 dark:text-white">
                    {policy.approvedBy}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Policy Status Section */}
          <div className="mt-6">
            <div className="p-6 border border-gray-200 dark:border-white/10 rounded-xl mb-6 bg-white dark:bg-navy-700">
              <p className="text-gray-500 dark:text-gray-400 text-center mb-2">Status</p>
              <h2 className="text-2xl font-bold text-navy-700 dark:text-white text-center mb-2">
                {policy.status || 'Active'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Policy ID: {policy.id.substring(0, 8)}...
              </p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-500 dark:text-gray-400 text-center mb-4">Last updated</p>
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
            
            <div className="flex justify-center">
              <button 
                onClick={handleDownloadPDF}
                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white font-medium py-3 px-8 rounded-lg transition-colors"
                disabled={!policy.pdfUrl}
              >
                Download PDF
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

export default PolicyDetails;