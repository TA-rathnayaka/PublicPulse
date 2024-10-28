// src/services/policyService.js
import { firestore } from './firebase/firebase'; // Firebase configuration file
import { collection, getDocs, query, where } from 'firebase/firestore';

// Fetch all policies or filter by category
export const fetchPolicies = async (category) => {
  try {
    const policiesRef = collection(firestore, 'policies');
    const policiesQuery = category ? query(policiesRef, where('category', '==', category)) : policiesRef;
    const snapshot = await getDocs(policiesQuery);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching policies:', error);
    return [];
  }
};
