import { getFirestore, collection,doc,getDoc, query, where, onSnapshot } from "firebase/firestore";

const db = getFirestore();

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


