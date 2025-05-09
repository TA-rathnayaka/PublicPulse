import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useInstituteData } from "context/InstituteContext";
import Banner from "./components/Banner";
import NftCard from "../../../components/card/NftCard";
import TopCreatorTable from "./components/TableTopCreators";
import HistoryCard from "./components/HistoryCard";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import { firestore } from "../../../backend/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import axios from 'axios';
const Marketplace = () => {
  const navigate = useNavigate();
  const { user, userRole, instituteIds = [] } = useAuth();
  const { setInstituteId } = useInstituteData();
  const [institutes, setInstitutes] = useState([]);
  const [count,setCount]=useState(0);
  const [instituteCount,setInstituteCount]=useState(0);
  const [loadingInstitutes, setLoadingInstitutes] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetchInstitutes();
  }, [user,instituteIds]);
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/dashboard/user-count`); // adjust base URL if needed
        setCount(response.data.userCount);
      } catch (error) {
        console.error('Failed to fetch user count:', error);
      }
    };

    fetchUserCount();
  }, []);
  const fetchInstitutes = async () => {
    try {
      const colRef = collection(firestore, "institutes");
      const snapshot = await getDocs(colRef);
      const allInstitutes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInstituteCount(allInstitutes.length)
      
        // Filter only institutes user has access to
        const filtered = allInstitutes.filter((inst) =>
          instituteIds.includes(inst.id))
        setInstitutes(filtered);
        console.log("filtered ids :",filtered);
        
    } catch (err) {
      console.error("Error fetching institutes:", err);
      setInstitutes([]);
    } finally {
      setLoadingInstitutes(false);
    }
  };

  const handleInstituteClick = (id) => {
    setInstituteId(id); // this persists via context + localStorage
    navigate(`/admin/${id}/default`);
  };

  if (!user) return null;

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <Banner />

        {/* Institutes Section */}
        <div className="mt-5">
          <div className="mb-4 flex flex-col justify-between px-4 md:flex-row md:items-center">
            <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
              Your Institutes
            </h4>
          </div>

          <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
            {loadingInstitutes ? (
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-white p-4 dark:bg-navy-800">
                <p className="text-lg text-gray-600 dark:text-white">Loading...</p>
              </div>
            ) : institutes.length > 0 ? (
              institutes.map((inst) => (
                <NftCard
                  onClick={() => handleInstituteClick(inst.id)}
                  key={inst.id}
                  name={inst.name}
                  author={inst.location || "Location not specified"}
                  bidders={[]}
                  image={inst.logo}
                  currentBid=""
                  download="#"
                />
              ))
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-white p-4 dark:bg-navy-800">
                <p className="text-lg text-gray-600 dark:text-white">No institutes found</p>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Section for Super Admin */}
        {userRole === "super-admin" && (
          <div className="mt-5">
            <div className="mb-4">
              <h4 className="ml-1 text-xl font-bold text-navy-700 dark:text-white">
                Platform Statistics
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-xl bg-white p-4 dark:bg-navy-800">
                <h5 className="mb-2 text-lg font-semibold text-navy-700 dark:text-white">
                  Total Users
                </h5>
                {count}
              </div>
              <div className="rounded-xl bg-white p-4 dark:bg-navy-800">
                <h5 className="mb-2 text-lg font-semibold text-navy-700 dark:text-white">
                  Total Institutes
                </h5>
                <p className="text-md text-navy-600 dark:text-white">
                  {instituteCount}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default Marketplace;
