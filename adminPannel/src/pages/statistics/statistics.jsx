import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, TableRow, TableCell, TableHead, TableBody, Tooltip } from "@mui/material";
import { useAuth } from "../../context/authContext";

const StatisticsPage = () => {
  const { instituteId } = useAuth();
  const [polls, setPolls] = useState([]);

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
    try {
      const response = await axios.get(`/api/polls/download/${pollId}`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `poll_${pollId}.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  return (
    <div>
      <h2>Company Poll Statistics</h2>
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
                <Button variant="contained" color="primary" onClick={() => downloadCSV(poll.id)}>
                  Download CSV
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StatisticsPage;
