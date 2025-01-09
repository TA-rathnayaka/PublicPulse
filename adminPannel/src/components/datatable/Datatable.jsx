import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, fetchUserData } from '../../datatablesource';
import './datatable.scss';

const Datatable = () => {
  const [userRows, setUserRows] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await fetchUserData();
        console.log("Fetched users:", users); // Debug the fetched data
        if (Array.isArray(users)) {
          setUserRows(users);
        } else {
          console.error("Fetched data is not an array:", users);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Users
        <a href="/add-user" className="link">Add New User</a>
      </div>

      <DataGrid
  rows={userRows}
  columns={userColumns}
  pageSize={8}
  rowsPerPageOptions={[8]}
  rowHeight={80}
  disableSelectionOnClick
  getRowId={(row) => row.id}
/>
    </div>
  );
};

export default Datatable;
