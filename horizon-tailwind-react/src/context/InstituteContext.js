import React, { createContext, useContext, useState, useEffect } from "react";
import { firestore } from "../backend/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const InstituteContext = createContext();

export const InstituteProvider = ({ children }) => {
  const [instituteId, setInstituteIdState] = useState(() => {
    // Get from localStorage initially
    return localStorage.getItem("instituteId") || null;
  });
  const [instituteData, setInstituteData] = useState(null);

  // Keep localStorage in sync when instituteId changes
  useEffect(() => {
    if (instituteId) {
      localStorage.setItem("instituteId", instituteId);
    }
  }, [instituteId]);

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
  }, [instituteId]);

  // Wrap setter to also persist
  const setInstituteId = (id) => {
    setInstituteIdState(id);
    if (id) {
      localStorage.setItem("instituteId", id);
    } else {
      localStorage.removeItem("instituteId");
    }
  };

  return (
    <InstituteContext.Provider value={{ instituteData, instituteId, setInstituteId }}>
      {children}
    </InstituteContext.Provider>
  );
};

export const useInstituteData = () => {
  return useContext(InstituteContext);
};
