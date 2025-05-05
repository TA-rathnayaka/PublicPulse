import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "./firebase/firebase";

// Fetch notifications for a user
export const fetchNotifications = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required to fetch notifications.");
    }

    const notificationsQuery = query(
      collection(firestore, "notifications"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(notificationsQuery);

    const notifications = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Notifications fetched successfully:", notifications);
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error(`Failed to fetch notifications: ${error.message}`);
  }
};

// Send notifications to one or more users
export const sendNotifications = async ({
  message,
  target,
  type,
  metadata,
  instituteId,
  photoURL,
  pollId,
}) => {
  try {
    const notificationPayload = {
      message,
      type,
      metadata,
      instituteId,
      photoURL,
      pollId,
    };

    if (target === "all") {
      const usersSnapshot = await getDocs(collection(firestore, "users"));
      const allUsers = usersSnapshot.docs.map((doc) => doc.id);

      for (const userId of allUsers) {
        await createNotification({ ...notificationPayload, userId });
      }
      console.log("Notifications sent to all users.");
    } else {
      const targets = Array.isArray(target) ? target : [target];
      for (const userId of targets) {
        await createNotification({ ...notificationPayload, userId });
      }
      console.log("Notifications sent to target(s).");
    }
  } catch (error) {
    console.error("Error sending notifications:", error);
    throw new Error(`Failed to send notifications: ${error.message}`);
  }
};

// Create a single notification document
export const createNotification = async ({
  message,
  userId,
  type,
  metadata,
  instituteId,
  photoURL,
  pollId,
}) => {
  if (!message?.trim()) throw new Error("Notification message is required");
  if (!userId) throw new Error("User ID is required");
  if (!type?.trim()) throw new Error("Notification type is required");

  const notification = {
    message: message.trim(),
    userId,
    type: type.trim(),
    metadata: metadata || {},
    instituteId: instituteId || null,
    photoURL: photoURL || null,
    pollId: pollId || null,
    createdAt: new Date(),
    status: "pending",
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

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    if (!notificationId) {
      throw new Error("Notification ID is required to update status.");
    }

    const notificationRef = doc(firestore, "notifications", notificationId);
    await updateDoc(notificationRef, {
      status: "read",
    });

    console.log(`Notification ${notificationId} marked as read.`);
    return true;
  } catch (error) {
    console.error("Error updating notification status:", error);
    throw new Error(`Failed to update notification status: ${error.message}`);
  }
};
