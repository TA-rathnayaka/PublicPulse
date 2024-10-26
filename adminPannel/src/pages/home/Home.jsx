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
      <div className="homeContainer">
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
