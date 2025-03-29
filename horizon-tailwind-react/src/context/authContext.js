import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../backend/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth"; // Firebase Hook
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth); // Use Firebase's built-in hook
  const [userRole, setUserRole] = useState(null);
  const [instituteId, setInstituteId] = useState(null);
  const [instituteName, setInstituteName] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        resetUserData();
        return;
      }

      try {
        const adminDocRef = doc(firestore, "admins", user.uid);
        console.log("Fetching admin data for UID:", user.uid);
        
        const adminDocSnapshot = await getDoc(adminDocRef);
        if (!adminDocSnapshot.exists()) {
          console.warn("Admin document not found");
          resetUserData();
          return;
        }

        const adminData = adminDocSnapshot.data();
        setUserRole(adminData.role);
        setInstituteId(adminData.instituteId);

        if (adminData.instituteId) {
          await fetchInstituteName(adminData.instituteId);
        } else {
          setInstituteName(null);
        }
      } catch (error) {
        console.error("Failed to fetch admin or institute data:", error);
        resetUserData();
      } finally {
        setRoleLoading(false);
      }
    };

    fetchUserData();
  }, [user]); // Runs when `user` changes

  const fetchInstituteName = async (instituteId) => {
    try {
      const instituteDocRef = doc(firestore, "institutes", instituteId);
      const instituteDocSnapshot = await getDoc(instituteDocRef);

      if (instituteDocSnapshot.exists()) {
        setInstituteName(instituteDocSnapshot.data().name);
      } else {
        console.warn("Institute document not found");
        setInstituteName(null);
      }
    } catch (error) {
      console.error("Error fetching institute name:", error);
      setInstituteName(null);
    }
  };

  const resetUserData = () => {
    setUserRole(null);
    setInstituteId(null);
    setInstituteName(null);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, instituteId, instituteName, loading, roleLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
