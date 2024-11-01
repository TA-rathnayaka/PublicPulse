import { useEffect, useState } from "react";
import { firestore } from "./firebase/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

/**
 * Function to subscribe to notifications in Firestore.
 * @param {string} userId - The ID of the user for filtering notifications.
 * @param {function} setNotifications - Callback to set notifications in the calling component.
 * @param {function} setError - Callback to handle errors in the calling component.
 */

interface Notification {
    id: string;               // Unique identifier for the notification
    userId: string;           // ID of the user the notification is for  
    message: string;          // User-friendly message
    timestamp: string;        // ISO 8601 timestamp
    read: boolean;            // Indicates if the notification has been read
    data?: NotificationData;  // Additional data associated with the notification
  }
  interface NotificationData {
    link?: string;           // Link to the relevant resource
    pollId?: string;         // Relevant poll ID if applicable
    // Add more fields as necessary
  }
const subscribeToNotifications = (userId, setNotifications, setError) => {
  try {
    const notificationsRef = collection(firestore, "notifications");
    const notificationsQuery = query(
      notificationsRef,
      orderBy("timestamp", "desc") // Order notifications by timestamp
    );

    const unsubscribe = onSnapshot(
      notificationsQuery,
      (snapshot) => {
        const notifications = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNotifications(notifications);
        setError(null); // Reset error state on successful fetch
      },
      (error) => {
        console.error("Error fetching notifications:", error);
        setError(error.message || "An error occurred while fetching notifications.");
      }
    );

    return unsubscribe; // Return the unsubscribe function
  } catch (err) {
    console.error("Error setting up notification subscription:", err);
    setError(err.message || "Failed to set up notification subscription.");
  }
};

export default subscribeToNotifications;
