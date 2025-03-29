import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../backend/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [instituteId, setInstituteId] = useState(null);
  const [instituteName, setInstituteName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        try {
          const adminDocRef = doc(firestore, "admins", firebaseUser.uid);
          console.log("Fetching admin data for UID: ", firebaseUser.uid); // Log admin UID
          const adminDocSnapshot = await getDoc(adminDocRef);

          if (adminDocSnapshot.exists()) {
            const adminData = adminDocSnapshot.data();

            setUserRole(adminData.role);
            setInstituteId(adminData.instituteId);  // Ensure consistency here

            // Fetch institute name if companyId exists
            if (adminData.instituteId) {
              const instituteDocRef = doc(firestore, "institutes", adminData.instituteId);

              const instituteDocSnapshot = await getDoc(instituteDocRef);

              console.log("Institute Document Snapshot: ", instituteDocSnapshot); // Log institute snapshot
              if (instituteDocSnapshot.exists()) {
                const instituteData = instituteDocSnapshot.data();

                setInstituteName(instituteData.name);
              } else {
                console.warn("Institute document not found");
                setInstituteName(null);  // Ensure consistency here
              }
            } else {
              setInstituteName(null);  // Ensure consistency here
            }
          } else {
            console.warn("Admin document not found");
            setUserRole(null);
            setInstituteId(null);  // Ensure consistency here
            setInstituteName(null);  // Ensure consistency here
          }
        } catch (error) {
          console.error("Failed to fetch admin or institute data:", error);
          setUserRole(null);
          setInstituteId(null);  // Ensure consistency here
          setInstituteName(null);  // Ensure consistency here
        }
      } else {
        setUserRole(null);
        setInstituteId(null);  // Ensure consistency here
        setInstituteName(null);  // Ensure consistency here
      }

      setRoleLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <AuthContext.Provider value={{ user, userRole, instituteId, instituteName, loading, roleLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
