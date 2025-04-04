import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import Banner from "./components/Banner";
import NftCard from "../../../components/card/NftCard";
import TopCreatorTable from "./components/TableTopCreators";
import HistoryCard from "./components/HistoryCard";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import { firestore } from "../../../backend/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const Marketplace = () => {
  const navigate = useNavigate();
  const { user, userRole, instituteId } = useAuth();
  console.log("institute: ",instituteId);
  const [institute, setInstitute] = useState(null);

  // This effect will run when `user` or `instituteId` changes.
  useEffect(() => {
    console.log("useEffect triggered"); // Check if useEffect is running
  
      console.log("Fetching institute data...");
      fetchInstitutes();
    
  }, [user, instituteId]);// Add instituteId to dependencies to trigger when it changes.

  const fetchInstitutes = async () => {
    if (!instituteId) {
      console.log("No instituteId available");
      return; // Prevent running the fetch if instituteId is undefined
    }

    try {
      const instituteRef = doc(firestore, "institutes", instituteId);
      const instituteSnap = await getDoc(instituteRef);

      if (instituteSnap.exists()) {
        console.log("Institute data fetched:", instituteSnap.data());
        setInstitute(instituteSnap.data());
      } else {
        console.log("No such institute found!");
        setInstitute({});
      }
    } catch (error) {
      console.error("Error fetching institute:", error);
    }
  };

  if (!user) {
    return null; // Prevent rendering while redirecting
  }

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <Banner />

        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Your Institutes
          </h4>
        </div>

        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
  {institute && institute.name ? (
    <NftCard
    onClick={() => navigate(`/admin/${instituteId}`)}
      key={institute.id}
      name={institute.name}
      author="By Mark Benjamin"
      bidders={[]}
      image={institute.logo}
      currentBid="0.91 ETH"
      download="#"
    />
  ) : (
    <p className="text-white">No institutes found.</p>
  )}
</div>
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
