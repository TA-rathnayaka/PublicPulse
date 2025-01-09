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
import { subscribeToDailyEventCounts } from "../../services/analyticsService";

const Chart = ({ aspect, title }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Chart component mounted, subscribing to data...");
  
    const unsubscribe = subscribeToDailyEventCounts(
      (dailyData) => {

  
        const transformedData = dailyData.map((entry) => ({
          name: entry.date,
          Total: entry.count,
        }));
        
        setChartData(transformedData);
        setLoading(false); 
      },
      (err) => {
        console.error("Error in subscription:", err);
        setError(err);
        setLoading(false);
      }
    );
  
    return () => {
      console.log("Chart component unmounted, unsubscribing...");
      unsubscribe();
    };
  }, []);
  


  if (error) {
    return <div className="error">Error loading chart data: {error.message}</div>;
  }

  return (
    <div className="chart">
      <div className="title">{title}</div>
      {loading ? (
        <div className="chartLoading">
          <ResponsiveContainer width="100%" height={400}  aspect={aspect}>
          <div className="skeleton-loader"></div>
          </ResponsiveContainer>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}  aspect={aspect}>
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
