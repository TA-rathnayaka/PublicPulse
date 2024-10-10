import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
// import Firebase services

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Home = () => {
  // Authentication and Firestore logic can be used here


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="polls" />
          <Widget type="participation" />
          <Widget type="engagement" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Public Opinion Trends (Last 6 Months)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Polls</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
