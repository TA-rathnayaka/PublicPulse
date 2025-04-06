import React, { useState, useEffect, createContext, useContext } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase/config"; 

const PolicyContext = createContext();

export const usePolicyContext = () => useContext(PolicyContext);

export const PolicyProvider = ({ children, instituteId }) => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPolicies = async () => {
    try {
      const policiesCollection = collection(firestore, "policies");
      const policiesSnapshot = await getDocs(policiesCollection);
      const policiesData = policiesSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((policy) => policy.instituteId === instituteId);
      setPolicies(policiesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching policies: ", error);
      setError("Failed to load policies. Please try again later.");
      setLoading(false);
    }
  };

  const handleDelete = async (policyId) => {
    try {
      await deleteDoc(doc(firestore, "policies", policyId));
      setPolicies((prev) => prev.filter((policy) => policy.id !== policyId));
    } catch (error) {
      console.error("Error deleting policy:", error);
      setError("Failed to delete policy. Please try again.");
    }
  };

  // Fetch policies on component mount
  useEffect(() => {
    fetchPolicies();
  }, [instituteId]);

  const refreshPolicies = () => {
    setLoading(true);
    fetchPolicies();
  };

  // Provide context value
  const value = {
    policies,
    loading,
    error,
    refreshPolicies,
    handleDelete,
  };

  return (
    <PolicyContext.Provider value={value}>
      {children}
    </PolicyContext.Provider>
  );
};

// Example Policy List Component that uses the context
const PolicyList = () => {
  const { policies, loading, error, handleDelete } = usePolicyContext();

  if (loading) return <div>Loading policies...</div>;
  if (error) return <div className="error">{error}</div>;
  if (policies.length === 0) return <div>No policies found.</div>;

  return (
    <div className="policy-list">
      <h2>Institute Policies</h2>
      {policies.map((policy) => (
        <div key={policy.id} className="policy-item">
          <h3>{policy.title}</h3>
          <p>{policy.description}</p>
          <div className="policy-actions">
            <button onClick={() => handleDelete(policy.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};



export { PolicyList};