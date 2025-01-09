
import { alignProperty } from '@mui/material/styles/cssUtils';
import logo from './Assets/logo.png';

export const userColumns = [
  {
    field: 'photoUrl',
    headerName: '',
    width: 100,
    renderCell: (params) => (
      <img
        src={params.value || logo} // Fallback to default profile image
        alt="Profile"
        style={{ width: 40, height: 40, borderRadius: '50%' }}
      />
    ),
  },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'status', headerName: 'Status', width: 120 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 400,
    renderCell: (params) => {
      const handleDelete = async() => {
        const confirmed = window.confirm(`Are you sure you want to delete user: ${params.row.email}?`);
        if (confirmed) {
          console.log(`Deleting user: ${params.row.username}`);
          try {
            const response = await fetch(`http://localhost:3001/api/users/${params.row.id}`, {
              method: 'DELETE',
            });
            if (response.ok) {
              console.log(`User ${params.row.username} deleted`);
              // Refresh the list or update the UI after successful deletion
            } else {
              console.error(`Failed to delete user ${params.row.username}`);
            }
          } catch (error) {
            console.error('Error deleting user:', error);
          }
          // Add logic for deleting the user here (e.g., API call)
        } else {
          console.log('Deletion cancelled');
        }
      };
      
      const handleMakeAdmin = async() => {
        const confirmed = window.confirm(`Are you sure you want to make user: ${params.row.username} an admin?`);
        if (confirmed) {
          console.log(`Making user: ${params.row.username} an admin`);
          // Add logic for promoting the user to admin here (e.g., API call)
          try {
            const response = await fetch(`http://localhost:3000/api/users/${params.row.id}/make-admin`, {
              method: 'POST',
            });
            if (response.ok) {
              console.log(`User ${params.row.username} made admin`);
              // Refresh the list or update the UI after promotion
            } else {
              console.error(`Failed to make user ${params.row.username} an admin`);
            }
          } catch (error) {
            console.error('Error making user admin:', error);
          }
        } else {
          console.log('Action cancelled');
        }
      };
      
      return (
        <div className="cellAction">
          <button onClick={handleDelete} className="actionButton delete" style={{ marginRight: '10px' }}>
            Delete
          </button>
          <button onClick={handleMakeAdmin} className="actionButton edit">Make as Admin</button>
          <button className="actionButton view">View</button>
        </div>
      );
    },
  },
];





// src/services/userService.js
export const fetchUserData = async () => {
  try {
    console.log("Fetching users...");
    const response = await fetch("http://localhost:3000/api/users"); // Ensure your backend is running
    if (!response.ok) {
      console.log("failed to fetch");
      throw new Error("Failed to fetch users");
    }
    const users = await response.json();
    console.log("Fetched users:", users); // Log the fetched users data
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};



