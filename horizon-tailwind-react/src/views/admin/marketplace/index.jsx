import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useInstituteData } from "context/InstituteContext"; // Import the context
import Banner from "./components/Banner";
import NftCard from "../../../components/card/NftCard";
import TopCreatorTable from "./components/TableTopCreators";
import HistoryCard from "./components/HistoryCard";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import { firestore } from "../../../backend/firebase/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

const Marketplace = () => {
  const navigate = useNavigate();
  const { user, userRole, instituteId } = useAuth();
  const { setInstituteId } = useInstituteData(); // Get the setter from context
  const [institutes, setInstitutes] = useState([]);
  const [loadingInstitutes, setLoadingInstitutes] = useState(true);

  useEffect(() => {
    if (!user) return;

    if (userRole === "super-admin") {
      fetchAllInstitutes();
    } else if (instituteId) {
      fetchSingleInstitute(instituteId);
    }
  }, [user, userRole, instituteId]);

  const fetchSingleInstitute = async (id) => {
    try {
      const ref = doc(firestore, "institutes", id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setInstitutes([{ id: snapshot.id, ...snapshot.data() }]);
      } else {
        setInstitutes([]);
      }
    } catch (err) {
      console.error("Error fetching institute:", err);
      setInstitutes([]);
    } finally {
      setLoadingInstitutes(false);
    }
  };

  const fetchAllInstitutes = async () => {
    try {
      const colRef = collection(firestore, "institutes");
      const snapshot = await getDocs(colRef);
      const allInstitutes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInstitutes(allInstitutes);
    } catch (err) {
      console.error("Error fetching all institutes:", err);
      setInstitutes([]);
    } finally {
      setLoadingInstitutes(false);
    }
  };

  // Handle card click - update context and navigate
  const handleInstituteClick = (id) => {
    // Update the InstituteContext with the selected instituteId
    setInstituteId(id);
    // Navigate to the institute page
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
              {userRole === "super-admin" ? "All Institutes" : "Your Institute"}
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
                {/* Add user stats here */}
              </div>
              <div className="rounded-xl bg-white p-4 dark:bg-navy-800">
                <h5 className="mb-2 text-lg font-semibold text-navy-700 dark:text-white">
                  Total Institutes
                </h5>
                <p className="text-md text-navy-600 dark:text-white">{institutes.length}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        {userRole === "super-admin" && (
          <>
            <TopCreatorTable
              extra="mb-5"
              tableData={tableDataTopCreators}
              columnsData={tableColumnsTopCreators}
            />
            <HistoryCard />
          </>
        )}
      </div>
    </div>
  );
};

export default Marketplace;