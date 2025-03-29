import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Banner from "./components/Banner";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import PolicyCard from "components/card/PolicyCard";
import HistoryCard from "./components/HistoryCard";
import { firestore } from "services/firebaseConfig";
import { useInstituteData } from "context/InstituteContext";

const PolicyMarketplace = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [policyType, setPolicyType] = useState("All");
  const { instituteId } = useInstituteData();
  
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
      setLoading(false);
    }
  };

  const handleDelete = async (policyId) => {
    try {
      await deleteDoc(doc(firestore, "policies", policyId));
      setPolicies((prev) => prev.filter((policy) => policy.id !== policyId));
    } catch (error) {
      console.error("Error deleting policy:", error);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const historyData = policies
  .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)) 
  .map((policy) => ({
    id: policy.id,
    image: policy.imageUrl || "defaultImage", 
    title: policy.title,
    owner: policy.createdBy,
    time: new Date(policy.createdDate).toDateString(), 
  }));

  // Filter policies based on selected type
  const filteredPolicies = policyType === "All" 
    ? policies 
    : policies.filter(policy => policy.type === policyType);

  // Split policies into two groups for display
  const trendingPolicies = filteredPolicies.slice(0, 3);
  const recentPolicies = filteredPolicies.slice(3, 6);

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* Policy Banner */}
        <Banner />

        {/* Policy Header */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Company Policies
          </h4>
          <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
            <li>
              <a
                className={`text-base font-medium ${policyType === "All" ? "text-brand-500" : "text-gray-600 dark:text-white"} hover:text-brand-500`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPolicyType("All");
                }}
              >
                All
              </a>
            </li>
            <li>
              <a
                className={`text-base font-medium ${policyType === "HR" ? "text-brand-500" : "text-gray-600 dark:text-white"} hover:text-brand-500`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPolicyType("HR");
                }}
              >
                HR
              </a>
            </li>
            <li>
              <a
                className={`text-base font-medium ${policyType === "Finance" ? "text-brand-500" : "text-gray-600 dark:text-white"} hover:text-brand-500`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPolicyType("Finance");
                }}
              >
                Finance
              </a>
            </li>
            <li>
              <a
                className={`text-base font-medium ${policyType === "IT" ? "text-brand-500" : "text-gray-600 dark:text-white"} hover:text-brand-500`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPolicyType("IT");
                }}
              >
                IT
              </a>
            </li>
          </ul>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-lg text-gray-500">Loading policies...</p>
          </div>
        ) : (
          <>
            {/* Featured Policies */}
            <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
              {trendingPolicies.length > 0 ? (
                trendingPolicies.map((policy) => (
                  <PolicyCard
                    key={policy.id}
                    imageUrl={policy.imageUrl || null}
                    id={policy.id}
                    title={policy.title || "Untitled Policy"}
                    author={policy.createdBy || "Unknown Author"}
                    createdDate={policy.createdDate || "N/A"}
                    type={policy.type || "General"}
                    onDelete={() => handleDelete(policy.id)}
                  />
                ))
              ) : (
                <div className="col-span-3 flex justify-center items-center h-40">
                  <p className="text-lg text-gray-500">No policies found</p>
                </div>
              )}
            </div>

            {/* Recently Updated Policies */}
            <div className="mb-4 mt-5 flex items-center justify-between px-[26px]">
              <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                Recently Updated
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {recentPolicies.length > 0 ? (
                recentPolicies.map((policy) => (
                  <PolicyCard
                    key={policy.id}
                    id={policy.id}
                    reviewers={[avatar1, avatar2, avatar3]}
                    title={policy.title || "Untitled Policy"}
                    author={policy.author || "Unknown Author"}
                    lastUpdated={policy.updatedAt?.toDate?.().toLocaleDateString() || "N/A"}
                    type={policy.type || "General"}
                    onDelete={() => handleDelete(policy.id)}
                  />
                ))
              ) : (
                <div className="col-span-3 flex justify-center items-center h-40">
                  <p className="text-lg text-gray-500">No additional policies found</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
      <HistoryCard HistoryData={historyData.slice(0, 10)} />
      </div>
    </div>
  );
};

export default PolicyMarketplace;