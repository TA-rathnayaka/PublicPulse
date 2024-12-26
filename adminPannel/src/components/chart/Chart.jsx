import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CircularProgress from "@mui/material/CircularProgress"; // Material UI loader
import { useEffect, useState } from "react";
import {
  subscribeToDailyEventCounts,
} from "../../services/analyticsService"; // Import real-time listener service

const Chart = ({ aspect, title }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set loading to true initially
    setIsLoading(true);

    // Subscribe to real-time event count updates
    const unsubscribe = subscribeToDailyEventCounts(
      (dailyData) => {
        // Transform the daily data to match the chart format
        const transformedData = dailyData.map((entry) => ({
          name: entry.date, // Date displayed on the X-axis
          Total: entry.count, // Engagement count on the Y-axis
        }));
        setChartData(transformedData);
        setIsLoading(false); // Stop loading when data is updated
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );

    // Cleanup the subscription on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  if (error) {
    return <div className="error">Error loading chart data: {error.message}</div>;
  }

  return (
    <div className="chart">
      <div className="title">{title}</div>
      {isLoading ? (
        <div className="chartLoading">
          <CircularProgress size={40} />
        </div>
      ) : (
        <ResponsiveContainer width="100%" aspect={aspect}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Total"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;
