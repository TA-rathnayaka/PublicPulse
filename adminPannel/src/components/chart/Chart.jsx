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
import { getAnalytics, logEvent } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Import Firestore for fetching data

const Chart = ({ aspect, title, dataType, loading }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Firebase Analytics and Firestore
  const analytics = getAnalytics();
  const db = getFirestore();

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "analyticsData")); // Replace "analyticsData" with your actual Firestore collection name

        const data = [];
        querySnapshot.forEach((doc) => {
          const dataPoint = doc.data();
          data.push({
            name: dataPoint.name, // Adjust the field names based on your Firestore document structure
            Total: dataPoint.Total,
          });
        });
        setChartData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [db]);

  // Choose data based on the type of report requested
  const data = dataType === "votes" ? chartData : chartData; // Update this based on your logic

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
            width={730}
            height={250}
            data={data}
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
