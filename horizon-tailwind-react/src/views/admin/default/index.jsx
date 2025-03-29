import React, { useEffect, useState } from "react";
import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";

import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import axios from "axios";
import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";
import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { useInstituteData } from "context/InstituteContext";
import UserEngagement from "./components/TotalSpent";

const Dashboard = () => {
  const { instituteData, instituteId } = useInstituteData();
  const [stats, setStats] = useState({
    totalPolls: 0,
    totalVotes: 0,
    activePolls: 0,
    totalComments: 0,
    totalPolicies: 0,
    totalEmployees: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!instituteId) {
        console.error("instituteId is undefined");
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/dashboard/stats`,
          {
            headers: {
              instituteId: instituteId,
            },
          }
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [instituteId]);

  return (
    <div>
      {/* Card widget */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Polls"}
          subtitle={stats.totalPolls}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Total Votes"}
          subtitle={stats.totalVotes}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Policies"}
          subtitle={stats.totalPolicies}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Active Polls"}
          subtitle={stats.activePolls}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Comments"}
          subtitle={stats.totalComments}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Employees"}
          subtitle={stats.totalEmployees}
        />
      </div>

      {/* Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        
        <UserEngagement instituteId={instituteId} /> {/* Replace TotalSpent with UserEngagement */}
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;