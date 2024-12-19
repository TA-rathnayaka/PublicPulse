import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import "./layout.scss";
import { auth, firestore } from "./backend/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import Forbidden from "./components/forbidden/Forbidden";

const Layout = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [navbarData, setNavbarData] = useState(null);
  const [user, loading, authError] = useAuthState(auth);
  const location = useLocation(); // Get current location

  const excludedRoutes = ["/login", "/signup"]; // Routes to exclude from Layout

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

            localStorage.setItem(
              `userData_${user.uid}`,
              JSON.stringify({
                name: data.Name,
                birthdate: data.Birthdate.toDate().toString(),
                citizenship: data.Citizenship,
                district: data.District,
                division: data.Division,
                imgURL: data.ImgURL,
                nationalId: data.NationalId,
                status: data.Status,
              })
            );
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

  useEffect(() => {
    // Set navbarData based on the current path
    switch (location.pathname) {
      case "/polls":
        setNavbarData("Polls");
        break;
      case "/":
        setNavbarData("Dashboard");
        break;
      case "/settings":
        setNavbarData("Settings");
        break;
      case "/users":
        setNavbarData("Users");
        break;
      case "/policies":
        setNavbarData("Policies");
        break;
      case "/notifications":
        setNavbarData("Notifications");
        break;
      case "/statistics":
        setNavbarData("Statistics");
        break;
      default:
        setNavbarData("Select a page");
    }
  }, [location.pathname]); // Run effect whenever the path changes

  // Exclude Layout for specific routes
  if (excludedRoutes.includes(location.pathname)) {
    return <>{children}</>;
  }

  // If the user is not authenticated, show the Forbidden component
  if (!user) {
    return <Forbidden />;
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="layoutContainer">
        <Navbar imgURL={userData?.imgURL || ""} navbarData={navbarData} />
        <div className="children">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
