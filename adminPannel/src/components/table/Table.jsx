import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      policy: "Healthcare Reform",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      citizen: "John Smith",
      date: "1 March",
      votes: 785,
      method: "Mobile App",
      status: "Approved",
    },
    {
      id: 2235235,
      policy: "Education Policy",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      citizen: "Michael Doe",
      date: "1 March",
      votes: 900,
      method: "Website",
      status: "Pending",
    },
    {
      id: 2342353,
      policy: "Taxation Law",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      citizen: "John Smith",
      date: "1 March",
      votes: 35,
      method: "Mobile App",
      status: "Pending",
    },
    {
      id: 2357741,
      policy: "Infrastructure Development",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      citizen: "Jane Smith",
      date: "1 March",
      votes: 920,
      method: "Website",
      status: "Approved",
    },
    {
      id: 2342355,
      policy: "Environmental Protection",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      citizen: "Harold Carol",
      date: "1 March",
      votes: 2000,
      method: "Mobile App",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">User ID</TableCell>
            <TableCell className="tableCell">Policy</TableCell>
            <TableCell className="tableCell">Citizen</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Votes</TableCell>
            <TableCell className="tableCell">Voting Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.policy}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.citizen}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.votes}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
