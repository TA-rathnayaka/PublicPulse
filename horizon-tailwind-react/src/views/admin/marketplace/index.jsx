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
  const [institute, setInstitute] = useState(null);

  useEffect(() => {
    if (instituteId) {
      fetchInstitutes();
    }
  }, [user, instituteId]);

  const fetchInstitutes = async () => {
    if (!instituteId) {
      console.log("No instituteId available");
      return;
    }

    try {
      const instituteRef = doc(firestore, "institutes", instituteId);
      const instituteSnap = await getDoc(instituteRef);

      if (instituteSnap.exists()) {
        setInstitute(instituteSnap.data());
      } else {
        setInstitute({});
      }
    } catch (error) {
      console.error("Error fetching institute:", error);
    }
  };

  if (!user) {
    return null;
  }

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
            {institute && institute.name ? (
              <NftCard
                onClick={() => navigate(`/admin/${instituteId}/default`)}
                key={institute.id}
                name={institute.name}
                author={institute.location || "Location not specified"}
                bidders={[]}
                image={institute.logo}
                currentBid=""
                download="#"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-white p-4 dark:bg-navy-800">
                <p className="text-lg text-gray-600 dark:text-white">
                  No institutes found
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Section */}
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
                {/* Add your statistics here */}
              </div>
              <div className="rounded-xl bg-white p-4 dark:bg-navy-800">
                <h5 className="mb-2 text-lg font-semibold text-navy-700 dark:text-white">
                  Total Institutes
                </h5>
                {/* Add your statistics here */}
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
