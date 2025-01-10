import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../services/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import PolicyOutlinedIcon from "@mui/icons-material/DescriptionOutlined"; // Example icon for policies
import "./PoliciesPage.scss";

const PoliciesPage = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch data from Firebase
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const policiesCollection = collection(firestore, "policies");
        const policiesSnapshot = await getDocs(policiesCollection);
        const policiesData = policiesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPolicies(policiesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching policies: ", error);
      }
    };

    fetchPolicies();
  }, []);

  // Delete policy function
  const handleDelete = async (policyId) => {
    try {
      await deleteDoc(doc(firestore, "policies", policyId));
      setPolicies((prev) => prev.filter((policy) => policy.id !== policyId));
    } catch (error) {
      console.error("Error deleting policy:", error);
    }
  };

  if (loading) {
    return (
      <div className="policies-page-container">
        <div className="recent-policies">
          <h3 style={{ marginBottom: "2rem" }}>Recent Policies</h3>
          <div className="policy-list">
            {Array(1)
              .fill()
              .map((_, index) => (
                <div key={index} className="policy-item-loading">
                  <div className="policy-info-loading">
                    <div className="policy-image-loading"></div>
                    <div>
                      <div className="policy-title-loading"></div>
                      <div className="policy-description-loading"></div>
                    </div>
                  </div>
                  <div className="policy-details-list-loading">
                    <div className="policy-details-item-loading"></div>
                    <div className="policy-details-item-loading"></div>
                    <div className="policy-details-item-loading"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="policies-page-container">
      <div className="recent-policies">
        <h3 style={{ marginBottom: "2rem" }}>Recent Policies</h3>
        <div className="policy-list">
          {policies.length ? (
            policies.map((policy) => (
              <div key={policy.id} className="policy-item">
                <div className="policy-info">
                  {policy.imageUrl ? (
                    <img
                      src={policy.imageUrl}
                      alt={policy.title}
                      className="policy-image"
                    />
                  ) : (
                    <PolicyOutlinedIcon className="policy-icon" />
                  )}
                  <div>
                    <h4>{policy.title}</h4>
                    <p>{policy.description}</p>
                  </div>
                </div>

                <div className="policy-details-list">
                  <span>Category: {policy.category || "Uncategorized"}</span>
                  <span>Section: {policy.sectionNo || "N/A"}</span>
                  <span>Created: {policy.createdDate || "Unknown"}</span>
                </div>
                <button
                  className="view-details-button"
                  onClick={() => navigate(`${policy.id}`, { relative: "path" })}
                >
                  View Details
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(policy.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="no-policies">No recent policies available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;
