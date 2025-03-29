import { sha256 } from "crypto-js"; // Import a hashing function

const voteForOption = async (pollId, selectedOption) => {
  //increment the option count
  const pollRef = doc(firestore, "polls", pollId);
  const pollDoc = await getDoc(pollRef);

  if (pollDoc.exists()) {
    const pollData = pollDoc.data();
    const options = pollData.Options.map((option) => {
      if (option.option === selectedOption) {
        return { ...option, count: option.count + 1 };
      }
      return option;
    });

    await updateDoc(pollRef, { Options: options });
  } else {
    console.log("Poll does not exist");
  }
};

export const voteOnPoll = async (pollID, selectedOption, userID) => {
  //add vote to votes collection
  const hashedUserID = sha256(userID).toString(); // Hash the userID
  const voteRef = doc(firestore, "votes", `${pollID}_${hashedUserID}`);

  // Check if user already voted (by checking hashedUserID)
  const voteSnap = await getDoc(voteRef);
  if (!voteSnap.exists()) {
    // Increment vote count in Polls collection
    const pollRef = doc(firestore, "polls", pollID);
    await updateDoc(pollRef, {
      [`options.${selectedOption}.votes`]: increment(1),
      totalVotes: increment(1),
    });

    // Save the vote anonymously (using hashedUserID)
    await setDoc(voteRef, {
      hashedUserID,
      pollID,
      selectedOption,
      timestamp: serverTimestamp(),
    });
  } else {
    console.log("User has already voted");
  }
};
