import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Button, Table, TableRow, TableCell, TableHead, TableBody, Tooltip, 
  CircularProgress, Box, Typography 
} from "@mui/material";
import { useAuth } from "../../context/authContext";
import "./StatisticsPage.scss"; // Import SCSS file

const StatisticsPage = () => {
  const { instituteId } = useAuth();
  const [polls, setPolls] = useState([]);
  const [loadingPollId, setLoadingPollId] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/polls/company/${instituteId}`)
      .then(response => setPolls(response.data))
      .catch(error => console.error("Error fetching polls:", error));
  }, [instituteId]);

  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp._seconds) return "N/A";
    return new Date(timestamp._seconds * 1000).toLocaleDateString();
  };

  const truncateTitle = (title, maxLength = 50) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
  };

  const downloadCSV = async (pollId) => {
    setLoadingPollId(pollId);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/export/${pollId}`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `poll_${pollId}.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading CSV:", error);
    } finally {
      setLoadingPollId(null);
    }
  };

  return (
    <div className="statistics-container">
      <h2>Company Poll Statistics</h2>
      <div className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Poll Title</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {polls.map((poll) => (
              <TableRow key={poll.id}>
                <TableCell>
                  <Tooltip title={poll.title}>
                    <span>{truncateTitle(poll.title)}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>{formatDate(poll.createdAt)}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => downloadCSV(poll.id)} 
                    disabled={loadingPollId === poll.id}
                  >
                    {loadingPollId === poll.id ? "Preparing..." : "Download CSV"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {loadingPollId && (
        <div className="loading-overlay">
          <div className="loading-box">
            <CircularProgress color="inherit" />
            <Typography mt={2}>Please wait, your CSV file is being prepared...</Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsPage;
