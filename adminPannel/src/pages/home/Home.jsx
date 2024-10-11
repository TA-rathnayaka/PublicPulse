import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import "./home.scss";
import "./Error.css";
// Import Firebase services
import { auth, firestore } from "../../backend/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore"; // Firestore methods

const Home = () => {
  const [user, loading, authError] = useAuthState(auth); // Firebase Auth state hook
  const [userData, setUserData] = useState(null); // State to hold user data from Firestore
  const [dataLoading, setDataLoading] = useState(true); // Loading state for user data
  const [fetchError, setFetchError] = useState(null); // To handle errors during data fetch

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userRef = doc(firestore, "users", user.uid); // Reference to the user document in Firestore
          const userDoc = await getDoc(userRef);
          console.log(user)
          if (userDoc.exists()) {
            setUserData(userDoc.data()); // Set the user data in state
          } else {
            setFetchError("User data not found.");
          }
        } catch (err) {
          setFetchError("Error fetching user data.");
        } finally {
          setDataLoading(false); // Stop loading after fetching
        }
      }
    };

    if (user && !loading) {
      fetchUserData(); // Fetch the user data once authenticated
    }
  }, [user, loading]);

  // Show authentication error if any
  if (authError) {
    return <div>Error during authentication: {authError.message}</div>;
  }

  // If the user is not authenticated, show an error or redirect
  if (!user) {
    return (
      <div className="loginMessage">
        <div>
          <h2>Please login to access this page.</h2>
          <p>You need to be authenticated to view the dashboard.</p>
        </div>
      </div>
    );
  }

  // Show dashboard while loading only necessary components
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="welcomeMessage">
          {/* Example of showing user data */}
          <h2>Welcome, {userData?.name || user.email}</h2>
          <p>Your role: {userData?.role}</p>
        </div>
        <div className="widgets">
          <Widget type="user" loading={loading || dataLoading} />
          <Widget type="polls" loading={loading || dataLoading} />
          <Widget type="participation" loading={loading || dataLoading} />
          
        </div>
        <div className="charts">
          <Featured />
          <Chart
            title="Public Opinion Trends (Last 6 Months)"
            aspect={2 / 1}
            loading={loading || dataLoading} // Pass loading prop to Chart
          />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Polls</div>
          <Table loading={loading || dataLoading} /> {/* Pass loading prop to Table */}
        </div>
      </div>
    </div>
  );
};

export default Home;
