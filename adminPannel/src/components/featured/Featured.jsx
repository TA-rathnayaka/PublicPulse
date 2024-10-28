import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import CircularProgress from "@mui/material/CircularProgress";

const Featured = ({ loading, data }) => {
  const {
    totalVotesPercentage = 0,
    totalVotesToday = 0,
    targetVotes = "0",
    lastWeekVotes = "0",
    lastMonthVotes = "0",
  } = data || {};

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Votes Counted</h1>
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
                value={totalVotesPercentage}
                text={`${totalVotesPercentage}%`}
                strokeWidth={5}
              />
            </div>
            <p className="title">Total votes cast today</p>
            <p className="amount">{totalVotesToday}</p>
            <p className="desc">
              Previous opinions processing. Recent votes may not be included.
            </p>
            <div className="summary">
              <SummaryItem
                title="Target"
                result={targetVotes}
                isPositive={false}
              />
              <SummaryItem
                title="Last Week"
                result={lastWeekVotes}
                isPositive={true}
              />
              <SummaryItem
                title="Last Month"
                result={lastMonthVotes}
                isPositive={true}
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
