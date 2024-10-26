import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import './layout.scss'; 
import { auth, firestore } from "./backend/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore"; 

const Layout = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [user, loading, authError] = useAuthState(auth);

    useEffect(() => {
        const fetchUserData = async () => {
          if (user) {
            try {
              const userRef = doc(firestore, "users", user.uid);
              const userDoc = await getDoc(userRef);

              if (userDoc.exists()) {
                const data = userDoc.data();

                setUserData({
                  name: data.Name,
                  birthdate: data.Birthdate.toDate().toString(),
                  citizenship: data.Citizenship,
                  district: data.District,
                  division: data.Division,
                  imgURL: data.ImgURL,
                  nationalId: data.NationalId,
                  status: data.Status,
                });

                localStorage.setItem(`userData_${user.uid}`, JSON.stringify({
                  name: data.Name,
                  birthdate: data.Birthdate.toDate().toString(),
                  citizenship: data.Citizenship,
                  district: data.District,
                  division: data.Division,
                  imgURL: data.ImgURL,
                  nationalId: data.NationalId,
                  status: data.Status,
                }));
              } else {
                console.log("User data not found.");
              }
            } catch (err) {
              console.log("Error fetching user data.", err);
            } 
          } else {
            console.log("User is not authenticated");
          }
        };

        if (user && !loading) {
          fetchUserData();
        }
    }, [user, loading]);

    return (
      <div className="layout">
        <Sidebar />
        <div className="layoutContainer">
          <Navbar imgURL={userData?.imgURL || ""} />
          <div className="children">{children}</div>
        </div>
      </div>
    );
};

export default Layout;
