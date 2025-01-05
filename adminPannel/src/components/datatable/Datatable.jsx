import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, fetchUserData } from '../../datatablesource';
import './datatable.scss';

const Datatable = () => {
  const [userRows, setUserRows] = useState([]);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await fetchUserData();
      setUserRows(users);
    };

    fetchUsers();
  }, []);

  // Add custom rendering for the status column
  const columnsWithStatus = userColumns.map((column) => {
    if (column.field === 'status') {
      return {
        ...column,
        renderCell: (params) => (
          <div className={`cellWithStatus ${params.row.status.toLowerCase()}`}>
            {params.row.status}
          </div>
        ),
      };
    }
    return column;
  });

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Data Table
        <a href="/add-user" className="link">
          Add New User
        </a>
      </div>

      {/* Data Table */}
      <DataGrid
        rows={userRows}
        columns={columnsWithStatus}
        pageSize={8}
        rowsPerPageOptions={[8]}
        rowHeight={60}
        disableSelectionOnClick
        getRowId={(row) => row.id}
        sx={{
          '& .MuiDataGrid-footerContainer': {
            display: 'none', // Hide the default footer
          },
        }}
      />

      {/* Custom Footer Section */}
      <div className="footerContainer">
        <span>Showing 1–{Math.min(8, userRows.length)} of {userRows.length} entries</span>
      </div>
    </div>
  );
};

export default Datatable;
