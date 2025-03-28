import { getFirestore, collection,doc,getDoc,getDocs, query, where, onSnapshot,deleteDoc } from "firebase/firestore";
import { storage } from "./firebase/firebase";
import { ref, deleteObject } from "firebase/storage";
const db = getFirestore();

// Function to delete the poll, its options, votes, and image
export const deletePoll = async (pollId, imageUrl) => {
  try {
    // Step 1: Delete options related to this poll
    const optionsCollection = collection(db, "options");
    const optionsQuery = query(optionsCollection, where("pollId", "==", pollId));
    const optionsSnapshot = await getDocs(optionsQuery);
    
    // Deleting each option
    optionsSnapshot.forEach(async (optionDoc) => {
      await deleteDoc(optionDoc.ref);
      console.log(`Option ${optionDoc.id} deleted`);
    });

    // Step 2: Delete votes related to this poll
    const votesCollection = collection(db, "votes");
    const votesQuery = query(votesCollection, where("pollId", "==", pollId));
    const votesSnapshot = await getDocs(votesQuery);
    
    // Deleting each vote
    votesSnapshot.forEach(async (voteDoc) => {
      await deleteDoc(voteDoc.ref);
      console.log(`Vote ${voteDoc.id} deleted`);
    });

    // Step 3: Delete the poll document from Firestore
    const pollDocRef = doc(db, "polls", pollId);
    await deleteDoc(pollDocRef);
    console.log(`Poll with ID ${pollId} deleted`);

    // Step 4: If there is an image associated with the poll, delete it from Firebase Storage
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      console.log("Image deleted successfully.");
    }

    // Optionally, delete other associated data like comments if applicable

  } catch (error) {
    console.error("Error deleting poll or its associated data:", error);
  }
};




// Fetch options for a given poll and their current vote count in real-time
export const listenToOptionVoteCounts = (pollId, onUpdate) => {
  try {
    // Create a query to fetch the options for the given poll
    const optionsQuery = query(
      collection(db, "options"),
      where("pollId", "==", pollId)
    );
    
    // Real-time listener for options
    const unsubscribe = onSnapshot(optionsQuery, (optionsSnapshot) => {
      const voteCounts = {};

      // Iterate through each option document and fetch its vote count and text
      optionsSnapshot.docs.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        const optionId = docSnapshot.id;
        const voteCount = data?.voteCount || 0; // Use the voteCount field or 0 if it doesn't exist
        const optionText = data?.text || ""; // Use the option field (text)

        // Update the vote count and text for each option
        voteCounts[optionId] = { voteCount, optionText };
      });

      // Call onUpdate to send the current vote counts and option texts
      onUpdate(voteCounts);
    });

    // Return the unsubscribe function to stop listening to updates when needed
    return unsubscribe;

  } catch (error) {
    console.error("Error listening to option vote counts:", error);
  }
};

export const fetchPollById = async (pollId) => {
  try {
    const pollDocRef = doc(db, "polls", pollId); // Reference to the specific poll
    const pollDoc = await getDoc(pollDocRef);

    if (pollDoc.exists()) {
      const pollData = { id: pollDoc.id, ...pollDoc.data() }; // Combine ID with document data
      console.log("Fetched Poll:", pollData); // Debugging output
      return pollData;
    } else {
      console.error(`Poll with ID ${pollId} does not exist.`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching poll by ID:", error);
    throw error;
  }
};


