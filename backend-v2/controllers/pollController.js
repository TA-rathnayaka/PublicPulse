const { firestore } = require('../config/firebase'); // Import Firestore
const { collection, addDoc, getDocs, doc, getDoc, deleteDoc } = require('firebase/firestore');


const createPoll = async (req, res) => {

    const { question, description, options } = req.body;

    if (!question || !options || options.length === 0) {
        return res.status(400).json({ message: "Question and at least one option are required." });
    }

    try {
        const pollRef = await addDoc(collection(firestore, 'polls'), {
            question,
            description,
            options
        });
        res.status(201).json({ message: "Poll created successfully", pollId: pollRef.id });
    } catch (error) {
        res.status(500).json({ message: "Error creating poll", error });
    }
};
const getPolls = async (req, res) => {
  console.log('getpolls called');
  try {
      const pollsCollection = firestore.collection('polls');
      const pollsSnapshot = await pollsCollection.get();

      if (pollsSnapshot.empty) {
          return res.status(404).json({ message: "No polls found" });
      }

      const polls = pollsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));

      res.status(200).json(polls);
  } catch (error) {
      console.error("Error fetching polls:", error);
      res.status(500).json({ message: "Error fetching polls", error });
  }
};


const getPollById = async (req, res) => {
    const { pollId } = req.params;

    try {
        const pollDoc = await getDoc(doc(firestore, 'polls', pollId));
        if (!pollDoc.exists()) {
            return res.status(404).json({ message: "Poll not found" });
        }

        res.status(200).json({ id: pollDoc.id, ...pollDoc.data() });
    } catch (error) {
        res.status(500).json({ message: "Error fetching poll", error });
    }
};

const deletePollById = async (req, res) => {
    const { pollId } = req.params;

    try {
        await deleteDoc(doc(firestore, 'polls', pollId));
        res.status(200).json({ message: "Poll deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting poll", error });
    }
};
const getLatestPolls = async (req, res) => {
    try {
    const pollsRef = firestore.collection("polls").orderBy("createdAt", "desc").limit(7);
    const snapshot = await pollsRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No polls found." });
    }

    const polls = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title.length > 30 ? data.title.substring(0, 30) + "..." : data.title, // Trim title
        createdAt: data.createdAt.toDate().toLocaleString(),
        pollType: data.settings?.requireNames ? "Named" : "Anonymous", // Poll type
        status: data.endDate ? "Closed" : "Active",
      };
    });

    res.status(200).json(polls);
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { createPoll, deletePollById, getPollById, getPolls , getLatestPolls};
