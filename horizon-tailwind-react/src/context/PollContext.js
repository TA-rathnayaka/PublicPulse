import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  updateDoc
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { sendNotifications } from "../backend/notifications";
import { firestore } from "../backend/firebase/firebase";
import { getAuth } from "firebase/auth";

const PollContext = createContext();

export const usePoll = () => {
  return useContext(PollContext);
};

export const PollProvider = ({ children, instituteId }) => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const storage = getStorage();
  const user = getAuth().currentUser;

  // Get all polls for an institute
  const getAllPolls = async () => {
    try {
      setLoading(true);
      const pollsRef = collection(firestore, "polls");
      const q = query(pollsRef, where("instituteId", "==", instituteId));
      const querySnapshot = await getDocs(q);
      
      const pollsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setPolls(pollsData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching polls:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get a single poll by ID
  const getPollById = async (pollId) => {
    try {
      const pollRef = doc(firestore, "polls", pollId);
      const pollSnap = await getDoc(pollRef);
      
      if (pollSnap.exists()) {
        return { id: pollSnap.id, ...pollSnap.data() };
      }
      throw new Error("Poll not found");
    } catch (err) {
      setError(err.message);
      console.error("Error fetching poll:", err);
      return null;
    }
  };

  // Upload poll image if available
  const uploadPollImage = async (imageFile) => {
    if (!imageFile) return null;
    try {
      const imageRef = ref(storage, `polls/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      return getDownloadURL(imageRef);
    } catch (err) {
      console.error("Error uploading image:", err);
      throw new Error(`Failed to upload image: ${err.message}`);
    }
  };

  // Create a new poll with options and image handling
  const createPoll = async (pollData) => {
    let pollRef = null;
    let optionRefs = [];
    let imageUrl = null;
    
    try {
      setLoading(true);
      
      // Handle image upload if imageFile is provided
      if (pollData.imageFile) {
        imageUrl = await uploadPollImage(pollData.imageFile);
      }
      
      // Extract options from poll data
      const { options = [], imageFile, ...pollFields } = pollData;
      
      // Create poll document with instituteId
      const pollsRef = collection(firestore, "polls");
      const newPoll = {
        ...pollFields,
        imageUrl: imageUrl || null,
        instituteId, // Add instituteId to poll document
        createdAt: new Date(),
        options: [], // Will be populated with option IDs
        status: "active"
      };
      
      pollRef = await addDoc(pollsRef, newPoll);
      
      // Create options for the poll
      const validOptions = Array.isArray(options) 
        ? options.filter(opt => (typeof opt === 'string' ? opt.trim() !== "" : opt.option?.trim() !== ""))
        : [];
      
      const optionIds = [];
      
      for (const opt of validOptions) {
        const optionText = typeof opt === 'string' ? opt : opt.option;
        const optionRef = await addDoc(collection(firestore, "options"), {
          pollId: pollRef.id,
          text: optionText.trim(),
          voteCount: 0,
          createdAt: new Date()
        });
        optionRefs.push(optionRef);
        optionIds.push(optionRef.id);
      }
      
      // Update poll with option IDs
      await updateDoc(pollRef, {
        options: optionIds
      });
      
      // Send notification if enabled
      if (pollData.settings?.notifyUsers) {
        try {
          await sendNotifications({
            message: `A new poll was added: ${pollData.title}`,
            target: "all",
            type: "polls",
            instituteId: instituteId,
            photoURL: pollData.imageUrl,
            pollId: pollRef.id,
            metadata: { 
              title: pollData.title.trim(),
              userId: user?.uid,
            },
          });
        } catch (notificationError) {
          console.error("Notification error:", notificationError);
          // Continue with poll creation even if notification fails
        }
      }
      
      const createdPoll = {
        id: pollRef.id,
        ...newPoll,
        options: optionIds
      };
      
      setPolls(prevPolls => [...prevPolls, createdPoll]);
      setError(null);
      return createdPoll;
      
    } catch (err) {
      setError(err.message);
      console.error("Error creating poll:", err);
      
      // Cleanup on error
      try {
        // Delete options if created
        for (const optionRef of optionRefs) {
          try {
            await deleteDoc(optionRef);
          } catch (cleanupErr) {
            console.error("Error deleting option:", cleanupErr);
          }
        }
        
        // Delete poll if created
        if (pollRef) {
          await deleteDoc(pollRef);
        }
        
        // Delete uploaded image if exists
        if (imageUrl) {
          const imageRef = ref(storage, imageUrl);
          try {
            await deleteObject(imageRef);
          } catch (imageDeleteErr) {
            console.error("Error deleting image:", imageDeleteErr);
          }
        }
      } catch (cleanupErr) {
        console.error("Error during cleanup:", cleanupErr);
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a poll and associated options/images
  const deletePoll = async (pollId) => {
    try {
      setLoading(true);
      
      // Get poll data to check for image and options
      const pollData = await getPollById(pollId);
      
      if (pollData) {
        // Delete image if exists
        if (pollData.imageUrl) {
          try {
            const imageRef = ref(storage, pollData.imageUrl);
            await deleteObject(imageRef);
          } catch (imageErr) {
            console.error("Error deleting poll image:", imageErr);
          }
        }
        
        // Delete associated options
        if (Array.isArray(pollData.options) && pollData.options.length > 0) {
          const optionsRef = collection(firestore, "options");
          const q = query(optionsRef, where("pollId", "==", pollId));
          const optionsSnapshot = await getDocs(q);
          
          const deletePromises = optionsSnapshot.docs.map(optDoc => 
            deleteDoc(doc(firestore, "options", optDoc.id))
          );
          
          await Promise.all(deletePromises);
        }
      }
      
      // Delete the poll document
      const pollRef = doc(firestore, "polls", pollId);
      await deleteDoc(pollRef);
      
      setPolls(prevPolls => prevPolls.filter(poll => poll.id !== pollId));
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Error deleting poll:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load polls when instituteId changes
  useEffect(() => {
    if (instituteId) {
      getAllPolls();
    }
  }, [instituteId]);

  const value = {
    polls,
    loading,
    error,
    getAllPolls,
    getPollById,
    createPoll,
    deletePoll
  };

  return (
    <PollContext.Provider value={value}>
      {children}
    </PollContext.Provider>
  );
};

export default PollContext;