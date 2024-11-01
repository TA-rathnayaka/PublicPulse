import { firestore } from "./firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

/**
 * Function to get document count from Firestore for a specified collection.
 * @param {string} collectionName - The name of the collection in Firestore.
 * @returns {Promise<number>} - The count of documents in the collection, or -1 if an error occurs.
 */
export const getDataCount = async (collectionName) => {
  try {
    const collectionRef = collection(firestore, collectionName); // Reference to the specified collection
    const snapshot = await getDocs(collectionRef); // Get all documents in the collection
    return snapshot.size; // Return the count of documents
  } catch (err) {
    console.error(`Error fetching document count from ${collectionName}:`, err);
    return -1; // Return -1 in case of an error
  }
};
