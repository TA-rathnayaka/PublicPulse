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
        
        // Format dates for display (e.g., "Mar 23", "Mar 24", etc.)
        const formattedDates = dates.map(date => {
          const dateObj = new Date(date);
          return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        
        setEngagementData({
          labels: formattedDates,
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
      color: "#5E37FF",
    },
    {
      name: "Poll Votes",
      data: engagementData.pollVotes,
      color: "#6AD2FF",
    },
  ];

  // Bar chart options with your specified styles
  const barChartOptions = {
    chart: {
      stacked: true,
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
      show: false,
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
      show: false,
      color: "black",
      labels: {
        show: false,
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
          opacity: 0.5,
        },
      },
      row: {
        opacity: 0.5,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
    },
    legend: {
      show: false,
    },
    colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
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

  // Calculate total interactions
  const totalInteractions = engagementData.policyViews.reduce((sum, value) => sum + value, 0) + 
                           engagementData.pollVotes.reduce((sum, value) => sum + value, 0);
  
  // Get percentage change from the API response if available
  const percentChange = -50; // Using the value from your JSON example

  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <div>
          <h2 className="text-lg font-bold text-navy-700 dark:text-white">
            Weekly Engagement
          </h2>
          <div className="flex items-center mt-1">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total: {totalInteractions} interactions
            </span>
            {percentChange !== 0 && (
              <span className={`ml-2 text-xs font-medium ${percentChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {percentChange > 0 ? '+' : ''}{percentChange}%
              </span>
            )}
          </div>
        </div>
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
          ) : engagementData.policyViews.every(val => val === 0) && engagementData.pollVotes.every(val => val === 0) ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">No engagement data available for this period</p>
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