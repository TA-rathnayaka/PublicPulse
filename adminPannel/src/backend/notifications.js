import { collection, addDoc ,getDocs,query, where,doc,updateDoc} from "firebase/firestore";
import { firestore } from "./firebase/firebase";


export const fetchNotifications = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required to fetch notifications.");
    }

    // Define the Firestore query to get notifications for the specific user
    const notificationsQuery = query(
      collection(firestore, "notifications"),
      where("userId", "==", userId)
    );

    // Execute the query and retrieve the documents
    const querySnapshot = await getDocs(notificationsQuery);

    // Map the documents into an array of notification objects
    const notifications = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include document ID for updates or deletions
      ...doc.data(), // Include the notification data
    }));

    console.log("Notifications fetched successfully:", notifications);
    return notifications; // Return the fetched notifications
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error(`Failed to fetch notifications: ${error.message}`);
  }
};

export const sendNotifications = async ({ message, target, type, metadata }) => {

  try {
    if (target === "all") {
      // Retrieve all users from Firestore
      const usersSnapshot = await getDocs(collection(firestore, "users"));
      const allUsers = usersSnapshot.docs.map(doc => doc.id); // Assuming the document ID is the userId

      // Send notification to all users
      for (const userId of allUsers) {
        await createNotification({ message, userId, type, metadata });
      }
      console.log("Notifications sent to all users.");
    } else {
      // Send notification to a specific user or group based on the target
      if (Array.isArray(target)) {
        for (const userId of target) {
          await createNotification({ message, userId, type, metadata });
        }
        console.log("Notifications sent to specific users.");
      } else {
        await createNotification({ message, userId: target, type, metadata });
        console.log("Notification sent to a single user.");
      }
    }
  } catch (error) {
    console.error("Error sending notifications:", error);
    throw new Error(`Failed to send notifications: ${error.message}`);
  }
};



export const createNotification = async ({ message, userId, type, metadata }) => {
  // Enhanced validation
  if (!message?.trim()) {
    throw new Error("Notification message is required and cannot be empty");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }
  if (!type?.trim()) {
    throw new Error("Notification type is required");
  }

  const notification = {
    message: message.trim(),
    userId, // Including userId
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

export const markNotificationAsRead = async (notificationId) => {
  try {
    if (!notificationId) {
      throw new Error("Notification ID is required to update status.");
    }

    // Reference to the specific notification document
    const notificationRef = doc(firestore, "notifications", notificationId);

    // Update the status field to 'read'
    await updateDoc(notificationRef, {
      status: "read",
    });

    console.log(`Notification ${notificationId} marked as read.`);
    return true; // Return success flag
  } catch (error) {
    console.error("Error updating notification status:", error);
    throw new Error(`Failed to update notification status: ${error.message}`);
  }
};

