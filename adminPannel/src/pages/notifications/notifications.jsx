import React, { useEffect, useState } from 'react';
import { useNotifications } from '../../context/NotificationsContext';
import { auth } from '../../services/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, getDocs, writeBatch, doc,updateDoc } from "firebase/firestore"; 
import { firestore } from '../../services/firebaseConfig'; // Make sure to import firestore

const Notifications = () => {
  const { notifications } = useNotifications();
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  // Mark a single notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      const notificationRef = doc(firestore, 'notifications', notificationId);
      await updateDoc(notificationRef, { isRead: true });
      console.log(`Notification ${notificationId} marked as read`);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all notifications as read for the user
  const markAllAsRead = async (userId) => {
    setLoading(true); // Set loading state
    try {
      const notificationsRef = collection(firestore, 'notifications');
      const q = query(notificationsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      const batch = writeBatch(firestore);
      querySnapshot.forEach((doc) => {
        const notificationDocRef = doc.ref;
        batch.update(notificationDocRef, { isRead: true });
      });

      await batch.commit();
      console.log("All notifications marked as read");
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
            />
          ))}
        </ul>
      )}
      <button onClick={() => markAllAsRead(user.uid)} disabled={loading}>
        {loading ? "Marking All as Read..." : "Mark All as Read"}
      </button>
    </div>
  );
};

// Component for rendering individual notification items
const NotificationItem = ({ notification, onMarkAsRead }) => {
  return (
    <li className={notification.isRead ? 'read' : 'unread'}>
      <p>{notification.message}</p>
      <button onClick={() => onMarkAsRead(notification.id)}>Mark as Read</button>
    </li>
  );
};

export default Notifications;
