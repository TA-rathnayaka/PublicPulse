import { collection, addDoc } from "firebase/firestore";
import { firestore } from "./firebase/firebase";

export const createNotification = async ({ message, target, type, metadata }) => {
    // Enhanced validation
    if (!message?.trim()) {
      throw new Error("Notification message is required and cannot be empty");
    }
    if (!target) {
      throw new Error("Notification target is required");
    }
    if (!type?.trim()) {
      throw new Error("Notification type is required");
    }
  
    const notification = {
      message: message.trim(),
      target,
      type: type.trim(),
      metadata: metadata || {},
      createdAt: new Date(),
      status: 'pending' // Add status to track notification state
    };
  
    try {
      const notificationRef = await addDoc(
        collection(firestore, "notifications"),
        notification
      );
  
      if (!notificationRef?.id) {
        throw new Error("Notification creation failed - no document reference returned");
      }
  
      console.log("Notification created successfully:", notificationRef.id);
      return notificationRef.id;
  
    } catch (error) {
      console.error("Error creating notification:", error);
      throw new Error(`Failed to create notification: ${error.message}`);
    }
  };
