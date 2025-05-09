import React, { useState, useEffect } from "react";
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

  const [dataLoading, setDataLoading] = useState(true); // Loading state for user data
  const [fetchError, setFetchError] = useState(null); // To handle errors during data fetch
  console.log("Loading : ", loading);

  // Show authentication error if any
  if (authError) {
    return <div>Error during authentication: {authError.message}</div>;
  }

  // If the user is not authenticated, show an error or redirect

  // Show dashboard while loading only necessary components
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" loading={loading || dataLoading} />
          <Widget type="polls" loading={loading || dataLoading} />
          <Widget type="participation" loading={loading || dataLoading} />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="User Engagement" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Home;
