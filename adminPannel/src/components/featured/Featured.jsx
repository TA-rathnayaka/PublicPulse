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
} from "../../services/analyticsService";

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

        // Fetch total participation and today's/yesterday's votes
        const totalVotes = await getTotalUserParticipation();
        const { todayCount, yesterdayCount, percentageChange } =
          await getTodayAndYesterdayVotes();

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
  }, []);

  const {
    totalVotes,
    todayVotes,
    yesterdayVotes,
    percentageChange,
  } = data;

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">User Engagement</h1>
        <MoreVertIcon fontSize="small" aria-label="Options" />
      </div>
      <div className="bottom">
        {loading ? (
          <div className="loadingContainer">
            <CircularProgress size={40} />
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
            <p className="desc">
              This includes all interactions today. Votes from yesterday may not
              be reflected.
            </p>
            <div className="summary">
              <SummaryItem
                title="Total Votes"
                result={totalVotes}
                isPositive={true}
              />
              <SummaryItem
                title="Yesterday's Votes"
                result={yesterdayVotes}
                isPositive={yesterdayVotes > 0}
              />
              <SummaryItem
                title="Percentage Change"
                result={`${Math.round(percentageChange)}%`}
                isPositive={percentageChange >= 0}
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
