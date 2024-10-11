import { auth, firestore } from "./firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

// Function to get user count from Firestore
export const getUserCount = async () => {
  try {
    // Check if the auth state is available
    if (auth) {
      const userCollectionRef = collection(firestore, "users"); // Reference to "users" collection
      const userSnapshot = await getDocs(userCollectionRef); // Get all documents in the collection
      return userSnapshot.size; // Return the number of documents (users)
    } else {
      return -1; // Return -1 if the user is not authenticated
    }
  } catch (err) {
    console.error("Error fetching user count:", err);
    return -1; // Return -1 in case of an error
  }
};

// Function to get poll count from Firestore
export const getPollCount = async () => {
  try {
    const pollCollectionRef = collection(firestore, "polls"); // Reference to "polls" collection
    const pollSnapshot = await getDocs(pollCollectionRef); // Get all poll documents
    return pollSnapshot.size; // Return the number of polls
  } catch (err) {
    console.error("Error fetching poll count:", err);
    return -1; // Return -1 in case of an error
  }
};

// Function to get participation count from Firestore
export const getParticipationCount = async () => {
  try {
    const participationCollectionRef = collection(firestore, "participation"); // Reference to "participation" collection
    const participationSnapshot = await getDocs(participationCollectionRef); // Get all participation documents
    return participationSnapshot.size; // Return the number of participation entries
  } catch (err) {
    console.error("Error fetching participation count:", err);
    return -1; // Return -1 in case of an error
  }
};
