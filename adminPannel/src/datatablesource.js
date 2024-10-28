// src/services/userService.js
import { firestore } from './backend/firebase/firebase'; // Import Firestore instance from your setup
import { collection, getDocs } from 'firebase/firestore';

// Define your user columns here
export const userColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'age', headerName: 'Age', width: 90 },
  // Add more columns as needed
];

// Function to fetch user data from Firestore
export const fetchUserData = async () => {
  try {
    // Reference to the 'users' collection
    const usersCollection = collection(firestore, 'users');
    
    // Fetch all documents in the 'users' collection
    const snapshot = await getDocs(usersCollection);
    
    // Map the snapshot data to an array of user objects with a unique ID
    const usersWithId = snapshot.docs.map((doc) => ({
      id: doc.id, // Use Firestore document ID as the unique ID
      username: doc.data().username || '', // Default to empty string if undefined
      email: doc.data().email || '',
      status: doc.data().status ? 'active' : 'inactive', // Convert boolean to string
      age: doc.data().age || null, // Default to null if undefined
    }));
    
    return usersWithId; // Return the transformed data
  } catch (error) {
    console.error('Error fetching users from Firestore:', error);
    return []; // Return an empty array on error
  }
};
