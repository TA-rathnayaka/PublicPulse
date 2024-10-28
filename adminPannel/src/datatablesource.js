// src/services/userService.js
import { firestore } from './backend/firebase/firebase'; // Import Firestore instance
import { collection, getDocs } from 'firebase/firestore';

export const userColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'birthdate', headerName: 'Birthdate', width: 150 },
  { field: 'district', headerName: 'District', width: 120 }
];

export const fetchUserData = async () => {
  try {
    const usersCollection = collection(firestore, 'users');
    const snapshot = await getDocs(usersCollection);

    const usersWithId = snapshot.docs.map((doc) => ({
      id: doc.id,
      username: doc.data().username || '',
      email: doc.data().email || '',
      status: doc.data().status ? 'active' : 'inactive',
      birthdate: doc.data().Birthdate || null, // Check for correct field casing
      district: doc.data().District || null  // Check for correct field casing
    }));
    
    return usersWithId;
  } catch (error) {
    console.error('Error fetching users from Firestore:', error);
    return [];
  }
};
