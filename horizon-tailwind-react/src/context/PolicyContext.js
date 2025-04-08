import React, { useState, useEffect, createContext, useContext, useCallback } from "react"; 
import { collection, getDocs, deleteDoc, doc, getDoc, query, where, orderBy } from "firebase/firestore"; 
import { firestore } from "../services/firebaseConfig";  

const PolicyContext = createContext();  

export const usePolicyContext = () => useContext(PolicyContext);  

// Helper alias for compatibility with the Details component 
export const usePolicy = () => useContext(PolicyContext);  

export const PolicyProvider = ({ children, instituteId }) => {   
  const [policies, setPolicies] = useState([]);   
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);
  // Cache for storing fetched policy details
  const [policyCache, setPolicyCache] = useState({});
      
  const fetchPolicies = useCallback(async () => {     
    try {       
      setLoading(true);
      setError(null);
      console.log("Fetching policies for institute:", instituteId);
      
      if (!instituteId) {
        console.log("Institute ID is not available yet");
        setLoading(false);
        return;
      }
      
      const policiesCollection = collection(firestore, "policies");       
      const policiesSnapshot = await getDocs(policiesCollection);       
      const policiesData = policiesSnapshot.docs         
        .map((doc) => ({           
          id: doc.id,           
          ...doc.data(),         
        }))         
        .filter((policy) => policy.instituteId === instituteId);     
      
      console.log(`Fetched ${policiesData.length} policies`);
      
      // Update policies state
      setPolicies(policiesData);       
      
      // Update cache with all policies for quick access
      const newCache = {};
      policiesData.forEach(policy => {
        newCache[policy.id] = policy;
      });
      setPolicyCache(prevCache => ({...prevCache, ...newCache}));
      
      setLoading(false);     
    } catch (error) {       
      console.error("Error fetching policies: ", error);       
      setError("Failed to load policies. Please try again later.");       
      setLoading(false);     
    }   
  }, [instituteId]);
  
  // New function to get policy history for a specific institute
  const getPolicyHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // We're reusing the existing policies if they're already loaded
      if (policies.length > 0) {
        setLoading(false);
        return policies;
      }
      
      // Otherwise fetch policies for this institute
      await fetchPolicies();
      return policies;
    } catch (error) {
      console.error("Error fetching policy history:", error);
      setError("Failed to load policy history. Please try again later.");
      setLoading(false);
      return [];
    }
  }, [fetchPolicies, policies]);
  
  const getPolicyById = async (policyId) => {     
    try {
      // Check if policy exists in cache first
      if (policyCache[policyId]) {
        console.log("Policy retrieved from cache:", policyId);
        return policyCache[policyId];
      }
      
      // If not in cache, fetch from Firestore
      console.log("Fetching policy from database:", policyId);
      const policyDocRef = doc(firestore, "policies", policyId);       
      const policyDocSnap = await getDoc(policyDocRef);              
      
      if (policyDocSnap.exists()) {
        const policy = {           
          id: policyDocSnap.id,           
          ...policyDocSnap.data()         
        };
        
        // Update cache with the newly fetched policy
        setPolicyCache(prevCache => ({
          ...prevCache,
          [policyId]: policy
        }));
        
        return policy;       
      } else {         
        console.error("No policy found with ID:", policyId);         
        return null;       
      }     
    } catch (error) {       
      console.error("Error fetching policy:", error);       
      throw new Error("Failed to fetch policy details");     
    }   
  };      
  
  const handleDelete = async (policyId) => {     
    try {       
      await deleteDoc(doc(firestore, "policies", policyId));       
      setPolicies((prev) => prev.filter((policy) => policy.id !== policyId));
      
      // Remove deleted policy from cache
      setPolicyCache(prevCache => {
        const newCache = {...prevCache};
        delete newCache[policyId];
        return newCache;
      });
    } catch (error) {       
      console.error("Error deleting policy:", error);       
      setError("Failed to delete policy. Please try again.");     
    }   
  };      
  
  useEffect(() => {     
    if (instituteId) {
      fetchPolicies();
    }
  }, [instituteId, fetchPolicies]);      
  
  const refreshPolicies = useCallback(() => {     
    setLoading(true);     
    fetchPolicies();   
  }, [fetchPolicies]);      
  
  const value = {     
    policies,     
    loading,     
    error,     
    refreshPolicies,     
    handleDelete,     
    getPolicyById,
    getPolicyHistory, // Add the new function
    policyCache
  };      
  
  return (     
    <PolicyContext.Provider value={value}>       
      {children}     
    </PolicyContext.Provider>   
  ); 
};