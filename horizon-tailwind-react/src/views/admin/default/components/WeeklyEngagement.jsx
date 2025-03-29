import React, { useEffect, useState } from "react";
import Card from "components/card";
import BarChart from "components/charts/BarChart";
import { MdBarChart } from "react-icons/md";
import axios from "axios";

const WeeklyEngagement = ({ instituteId }) => {
  const [engagementData, setEngagementData] = useState({
    labels: [],
    policyViews: [],
    pollVotes: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      if (!instituteId) {
        console.error("instituteId is undefined");
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/dashboard/engagement`,
          {
            params: { timeframe: "week" },
            headers: {
              instituteid: instituteId,
            },
          }
        );
        
        const { dates, chartData } = response.data;
        
        setEngagementData({
          labels: dates,
          policyViews: chartData.policyView || [],
          pollVotes: chartData.voteButton || []
        });
      } catch (error) {
        console.error("Error fetching weekly engagement data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeeklyData();
  }, [instituteId]);

  // Prepare chart data
  const barChartData = [
    {
      name: "Policy Views",
      data: engagementData.policyViews,
      color: "#4318FF",
    },
    {
      name: "Poll Votes",
      data: engagementData.pollVotes,
      color: "#6AD2FF",
    },
  ];

  // Bar chart options
  const barChartOptions = {
    chart: {
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000"
      },
      theme: 'dark',
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
    },
    xaxis: {
      categories: engagementData.labels,
      show: true,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
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
      show: true,
      color: "black",
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
    },
    grid: {
      borderColor: "rgba(163, 174, 208, 0.3)",
      show: true,
      yaxis: {
        lines: {
          show: false,
        },
      },
      row: {
        opacity: 0.5,
      },
      column: {
        opacity: 0.5,
      },
      padding: {
        left: 0,
        right: 0,
      },
    },
    fill: {
      type: "solid",
      colors: ["#5E37FF", "#6AD2FF"],
    },
    legend: {
      show: true,
      position: "bottom",
      
    },
    colors: ["#5E37FF", "#6AD2FF"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "20px",
      },
    },
  };

  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Weekly Engagement
        </h2>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="h-[250px] w-full xl:h-[350px]">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-brand-500 border-t-transparent"></div>
            </div>
          ) : (
            <BarChart
              chartData={barChartData}
              chartOptions={barChartOptions}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default WeeklyEngagement;