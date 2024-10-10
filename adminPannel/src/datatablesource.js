import axios from 'axios';

// Define your user columns here
export const userColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'age', headerName: 'Age', width: 90 },
  // Add more columns as needed
];

// Function to fetch user data from the API
export const fetchUserData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users/users'); // Update with your API endpoint
    // Ensure each user object has a unique ID
    const usersWithId = response.data.map((user, index) => ({
      id: user.id || index, // Use an existing id or the index as a fallback
      username: user.username,
      email: user.email,
      status: user.status ? 'active' : 'inactive', // Convert boolean to string
      age: user.age,
    }));
    return usersWithId; // Return the transformed data
  } catch (error) {
    console.error('Error fetching users:', error);
    return []; // Return an empty array on error
  }
};
