import { firestore } from "./firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

/**
 * Function to get document count from Firestore for a specified collection with real-time updates.
 * @param {string} collectionName - The name of the collection in Firestore.
 * @param {function} setCount - Callback function to set the document count in the calling component.
 * @param {function} setError - Callback function to handle errors in the calling component.
 */
export const subscribeToDataCount = (collectionName, setCount, setError) => {
  try {
    const collectionRef = collection(firestore, collectionName); // Reference to the specified collection

    // Set up real-time listener with onSnapshot
    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        setCount(snapshot.size); // Update the count of documents
        setError(null); // Reset error state on successful fetch
      },
      (error) => {
        console.error(`Error fetching document count for ${collectionName}:`, error);
        setError(error.message || "An error occurred while fetching data."); // Set error state
        setCount(0); // Optionally reset count to zero on error
      }
    );

    return unsubscribe; // Return the unsubscribe function to stop listening when needed
  } catch (err) {
    console.error(`Error setting up real-time updates for ${collectionName}:`, err);
    setError(err.message || "Failed to set up data subscription."); // Set error state
    setCount(0); // Reset count to zero on setup error
  }
};
