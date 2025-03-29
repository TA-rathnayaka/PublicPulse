import React, { useEffect, useState } from "react";
import {
  MdArrowDropUp,
  MdArrowDropDown,
  MdOutlineCalendarToday,
  MdBarChart,
} from "react-icons/md";
import Card from "components/card";
import LineChart from "components/charts/LineChart";
import axios from "axios";

const UserEngagement = ({ instituteId }) => {
  const [engagementData, setEngagementData] = useState({
    totalInteractions: 0,
    percentChange: 0,
    isPositive: true,
    chartData: {
      voteButton: [],
      policyView: []
    },
    dates: []
  });
  const [timeframe, setTimeframe] = useState("month");

  useEffect(() => {
    const fetchEngagementData = async () => {
      if (!instituteId) {
        console.error("instituteId is undefined");
        return;
      }
      
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/dashboard/engagement`,
          {
            params: { timeframe },
            headers: {
              instituteId: instituteId,
            },
          }
        );
        
        const { totalInteractions, percentChange, chartData, dates } = response.data;
        
        setEngagementData({
          totalInteractions,
          percentChange: Math.abs(percentChange).toFixed(2),
          isPositive: percentChange >= 0,
          chartData,
          dates
        });
      } catch (error) {
        console.error("Error fetching engagement data:", error);
      }
    };

    fetchEngagementData();
  }, [instituteId, timeframe]);

  // Prepare line chart data
  const lineChartData = [
    {
      name: "Policy Views",
      data: engagementData.chartData.policyView || [],
      color: "#4318FF",
    },
    {
      name: "Poll Votes",
      data: engagementData.chartData.voteButton || [],
      color: "#6AD2FF",
    },
  ];

  // Line chart options
  const lineChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 13,
        left: 0,
        blur: 10,
        opacity: 0.1,
        color: "#4318FF",
      },
    },
    colors: ["#4318FF", "#6AD2FF"],
    markers: {
      size: 0,
      colors: "white",
      strokeColors: "#4318FF",
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true,
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      type: "line",
    },
    xaxis: {
      type: "category",
      categories: engagementData.dates || [],
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
      column: {
        colors: ["transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
    ],
  };

  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <button 
          className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80"
          onClick={() => setTimeframe(timeframe === "month" ? "week" : "month")}
        >
          <MdOutlineCalendarToday />
          <span className="text-sm font-medium text-gray-600">
            {timeframe === "month" ? "This month" : "This week"}
          </span>
        </button>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
            {engagementData.totalInteractions.toLocaleString()}
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">Total Interactions</p>
            <div className="flex flex-row items-center justify-center">
              {engagementData.isPositive ? (
                <MdArrowDropUp className="font-medium text-green-500" />
              ) : (
                <MdArrowDropDown className="font-medium text-red-500" />
              )}
              <p className={`text-sm font-bold ${engagementData.isPositive ? "text-green-500" : "text-red-500"}`}>
                {engagementData.isPositive ? "+" : "-"}{engagementData.percentChange}%
              </p>
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <LineChart options={lineChartOptions} series={lineChartData} />
        </div>
      </div>
    </Card>
  );
};

export default UserEngagement;