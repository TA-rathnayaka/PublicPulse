import React, { createContext, useContext, useState, useEffect } from "react";
import { firestore } from "../backend/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

// Create the context
const InstituteContext = createContext();

// Create the provider component
export const InstituteProvider = ({ instituteId, children }) => {
  const [instituteData, setInstituteData] = useState(null);
  console.log("im on use Institute. instituteId: ", instituteId);
  // Fetch the institute data based on the instituteId
  useEffect(() => {
    const fetchInstituteData = async () => {
      try {
        const instituteRef = doc(firestore, "institutes", instituteId);
        const instituteSnap = await getDoc(instituteRef);

        if (instituteSnap.exists()) {
          console.log("Institute data fetched:", instituteSnap.data());
          setInstituteData(instituteSnap.data());
        } else {
          console.log("No such institute found!");
          setInstituteData({});
        }
      } catch (error) {
        console.error("Error fetching institute:", error);
      }
    };

    if (instituteId) {
      fetchInstituteData();
    }
  }, [instituteId]); // Re-run the effect when instituteId changes

  return (
    <InstituteContext.Provider value={{instituteData,instituteId}}>
      {children}
    </InstituteContext.Provider>
  );
};

// Custom hook to use the institute data
export const useInstituteData = () => {
  return useContext(InstituteContext);
};
