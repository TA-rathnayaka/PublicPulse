import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid'; // Import MUI DataGrid
import { userColumns, fetchUserData } from '../../datatablesource'; // Import userColumns and fetchUserData

const Datatable = () => {
  const [userRows, setUserRows] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await fetchUserData(); // Get user rows from the fetch function
      setUserRows(users); // Set the fetched data to userRows state
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={userRows} 
        columns={userColumns} 
        pageSize={5} 
        rowHeight={40} 
        disableSelectionOnClick 
        getRowId={(row) => row.id} // Ensure each row has a unique ID
      />
    </div>
  );
};

export default Datatable;