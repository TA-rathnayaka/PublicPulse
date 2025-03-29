// services/pollService.js
import { firestore } from './firebaseService';
import { collection, addDoc, getDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

const pollCollection = collection(firestore, 'polls');

const pollService = {
  createPoll: async (pollData) => {
    const newPoll = await addDoc(pollCollection, pollData);
    return newPoll.id;
  },

  getPollById: async (pollId) => {
    const pollRef = doc(firestore, 'polls', pollId);
    const pollSnapshot = await getDoc(pollRef);
    return pollSnapshot.exists() ? { id: pollId, ...pollSnapshot.data() } : null;
  },

  deletePoll: async (pollId) => {
    const pollRef = doc(firestore, 'polls', pollId);
    await deleteDoc(pollRef);
  },

  getAllPolls: async () => {
    const pollSnapshot = await getDocs(pollCollection);
    return pollSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
};

export default pollService;
