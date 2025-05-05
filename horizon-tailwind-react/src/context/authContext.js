import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../backend/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [userRole, setUserRole] = useState(null);
  const [instituteIds, setInstituteIds] = useState([]); // Store multiple IDs
  const [instituteNames, setInstituteNames] = useState([]); // Optional: Store multiple names
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

        const ids = adminData.institutes || []; // Array of institute IDs
        setInstituteIds(ids);
        console.log("institutes: ",ids)

        if (ids.length > 0) {
          await fetchInstituteNames(ids);
        } else {
          setInstituteNames([]);
        }
      } catch (error) {
        console.error("Failed to fetch admin or institute data:", error);
        resetUserData();
      } finally {
        setRoleLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const fetchInstituteNames = async (ids) => {
    try {
      const names = await Promise.all(
        ids.map(async (id) => {
          const docRef = doc(firestore, "institutes", id);
          const snapshot = await getDoc(docRef);
          return snapshot.exists() ? snapshot.data().name : null;
        })
      );
      setInstituteNames(names.filter(Boolean)); // Remove nulls
    } catch (error) {
      console.error("Error fetching institute names:", error);
      setInstituteNames([]);
    }
  };

  const resetUserData = () => {
    setUserRole(null);
    setInstituteIds([]);
    setInstituteNames([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        instituteIds,
        instituteNames,
        loading,
        roleLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
