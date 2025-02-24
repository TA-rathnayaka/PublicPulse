import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../backend/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        try {
          const adminDocRef = doc(firestore, "admins", firebaseUser.uid);
          const adminDocSnapshot = await getDoc(adminDocRef);

          if (adminDocSnapshot.exists()) {
            const adminData = adminDocSnapshot.data();
            setUserRole(adminData.role); // Set role as admin or super-admin
          } else {
            setUserRole(null);
          }
        } catch (error) {
          console.error("Failed to fetch admin role:", error);
        }
      } else {
        setUserRole(null);
      }
      setRoleLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userRole, loading, roleLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
