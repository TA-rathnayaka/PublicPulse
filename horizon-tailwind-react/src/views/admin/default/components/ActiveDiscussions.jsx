import React, { useEffect, useState } from "react";
import Card from "components/card";
import BarChart from "components/charts/BarChart";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import axios from "axios";
import { useInstituteData } from 'context/InstituteContext'; // Update with your actual path

const ActiveDiscussions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalComments, setTotalComments] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const [commentData, setCommentData] = useState({
    labels: [],
    comments: []
  });
  const { instituteId } = useInstituteData();

  useEffect(() => {
    const fetchCommentCounts = async () => {
      if (!instituteId) {
        console.error("instituteId is undefined");
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/dashboard/comments?instituteId=${instituteId}`
        );

        if (response.data && typeof response.data === 'object') {
          // Extract dates and ensure they're sorted
          const dates = Object.keys(response.data).sort();
          const formattedDates = dates.map(date => {
            const dateObj = new Date(date);
            return dateObj.getDate(); // Only the day of the month
          });
          

          // Extract values corresponding to the dates
          const commentCounts = dates.map(date => Number(response.data[date] || 0));

          // Calculate total comments
          const total = commentCounts.reduce((sum, count) => sum + count, 0);
          setTotalComments(total);

          // Calculate percentage change
          if (commentCounts.length >= 2) {
            const oldestValue = commentCounts[0];
            const newestValue = commentCounts[commentCounts.length - 1];
            
            if (oldestValue !== 0) {
              const change = ((newestValue - oldestValue) / oldestValue) * 100;
              setPercentChange(change.toFixed(1));
            } else {
              setPercentChange(0);
            }
          }

          setCommentData({
            labels: formattedDates,
            comments: commentCounts
          });
        }
      } catch (error) {
        console.error("Error fetching comment counts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (instituteId) {
      fetchCommentCounts();
    }
  }, [instituteId]);

  // Prepare chart data - using the same structure as the working component
  const barChartData = [
    {
      name: "Comments",
      data: commentData.comments,
      color: "#5E37FF"
    }
  ];

  // Bar chart options
  const barChartOptions = {
    chart: {
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
      categories: commentData.labels,
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
      colors: ["#5E37FF"],
    },
    legend: {
      show: false,
    },
    colors: ["#5E37FF"],
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
    <Card extra="pb-7 p-[20px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          <p className="text-sm font-medium leading-4 text-gray-600">
            Active Discussions
          </p>

        </div>
        <div className="mt-2 flex items-start">
          {percentChange !== 0 && (
            <div className={`flex items-center text-sm ${parseFloat(percentChange) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {parseFloat(percentChange) >= 0 ? (
                <MdArrowDropUp className="h-5 w-5" />
              ) : (
                <MdArrowDropDown className="h-5 w-5" />
              )}
              <p className="font-bold"> {parseFloat(percentChange) >= 0 ? `+${percentChange}%` : `${percentChange}%`} </p>
            </div>
          )}
        </div>
      </div>

      <div className="h-[300px] w-full pt-10 pb-0">
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
    </Card>
  );
};

export default ActiveDiscussions;