import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { 
  getTotalUserParticipation, 
  getTodayAndYesterdayVotes,
  subscribeToDailyEventCounts 
} from "../../services/analyticsService";

// Subscription functions
const subscribeToUserParticipation = (callback) => {
  return subscribeToDailyEventCounts(
    (eventData) => {
      const totalVotes = eventData.reduce((sum, day) => sum + day.count, 0);
      callback(totalVotes);
    },
    (error) => console.error("Error in user participation subscription:", error)
  );
};

const subscribeToVotesChange = (callback) => {
  return subscribeToDailyEventCounts(
    (eventData) => {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      const todayVotes = eventData.find(day => day.date === today)?.count || 0;
      const yesterdayVotes = eventData.find(day => day.date === yesterday)?.count || 0;
      
      callback(todayVotes, yesterdayVotes);
    },
    (error) => console.error("Error in votes change subscription:", error)
  );
};

const Featured = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalVotes: 0,
    todayVotes: 0,
    yesterdayVotes: 0,
    percentageChange: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const totalVotes = await getTotalUserParticipation();
        const { todayCount, yesterdayCount, percentageChange } = await getTodayAndYesterdayVotes();

        setData({
          totalVotes,
          todayVotes: todayCount,
          yesterdayVotes: yesterdayCount,
          percentageChange,
        });
      } catch (error) {
        console.error("Error fetching featured data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const unsubscribeParticipation = subscribeToUserParticipation((totalVotes) => {
      setData((prevData) => ({ ...prevData, totalVotes }));
    });

    const unsubscribeVotesChange = subscribeToVotesChange((todayCount, yesterdayCount) => {
      const percentageChange = calculatePercentageChange(todayCount, yesterdayCount);
      setData((prevData) => ({
        ...prevData,
        todayVotes: todayCount,
        yesterdayVotes: yesterdayCount,
        percentageChange,
      }));
    });

    return () => {
      unsubscribeParticipation();
      unsubscribeVotesChange();
    };
  }, []);

  const calculatePercentageChange = (todayVotes, yesterdayVotes) => {
    if (totalVotes === 0) return 0;
    return (((todayVotes - yesterdayVotes) / totalVotes) * 100);
  };

  const { totalVotes, todayVotes, yesterdayVotes, percentageChange } = data;

  return (
    <div className="featured">
      <div className="bottom">
        {loading ? (
          <div className="loadingContainer">
            <div className="skeletonChart"></div>
            <div className="skeletonItem skeletonText"></div>
            <div className="skeletonItem skeletonAmount"></div>
            <div className="skeletonItem skeletonSummary"></div>
          </div>
        ) : (
          <>
            <div className="featuredChart">
              <CircularProgressbar
                value={percentageChange}
                text={`${Math.round(percentageChange)}%`}
                strokeWidth={5}
              />
            </div>
            <p className="title">Total votes cast today</p>
            <p className="amount">{todayVotes}</p>
            <p className="desc">This includes all interactions today.</p>
            <div className="summary">
              <SummaryItem
                title="Total Votes"
                result={totalVotes}
                isPositive={true}
              />
              <SummaryItem
                title="Yesterday's Votes"
                result={yesterdayVotes}
                isPositive={yesterdayVotes - todayVotes > 0}
              />
              <SummaryItem
                title="Difference"
                result={`${todayVotes - yesterdayVotes}`}
                isPositive={todayVotes - yesterdayVotes >= 0}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const SummaryItem = ({ title, result, isPositive }) => (
  <div className="item">
    <div className="itemTitle">{title}</div>
    <div className={`itemResult ${isPositive ? "positive" : "negative"}`}>
      {isPositive ? (
        <KeyboardArrowUpOutlinedIcon fontSize="small" aria-label="Increase" />
      ) : (
        <KeyboardArrowDownIcon fontSize="small" aria-label="Decrease" />
      )}
      <div className="resultAmount">{result}</div>
    </div>
  </div>
);

export default Featured;
