import React, { useEffect, useState } from 'react';
import { firestore } from "../../backend/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../backend/firebase/firebase";
import './notifications.scss';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, loadingAuth] = useAuthState(auth);

  const fetchUserNotifications = async (userId) => {
    if (!userId) {
      console.error("User ID is undefined or invalid.");
      return [];
    }
  
    const userRef = doc(firestore, "users", userId);
    try {
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const notifications = userDoc.data().notifications || [];
        
        // Convert Firestore Timestamp to Date and sort by latest
        return notifications.map(notification => ({
          ...notification,
          dateTime: notification.dateTime 
            ? new Date(notification.dateTime.seconds * 1000) 
            : null // If dateTime is missing, set it to null
        })).sort((a, b) => (b.dateTime || 0) - (a.dateTime || 0));
      } else {
        console.error("No such user document!");
        return [];
      }
    } catch (error) {
      console.error("Error fetching user notifications:", error);
      return [];
    }
  };

  useEffect(() => {
    const getNotifications = async () => {
      if (loadingAuth) return;
      if (!user) {
        console.error("User is not authenticated");
        setLoading(false);
        return;
      }

      setLoading(true);
      const userNotifications = await fetchUserNotifications(user.uid);
      setNotifications(userNotifications);
      setLoading(false);
    };

    getNotifications();
  }, [user, loadingAuth]);

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  return (
    <div className="notifications">
      <div className="header">
        <h2>Your Notifications</h2>
      </div>
      {notifications.length === 0 ? (
        <div className="emptyMessage">No notifications to display.</div>
      ) : (
        <ul className="notificationList">
          {notifications.map((notification, index) => (
            <li className="notificationItem" key={index}>
              <p>{notification.message}</p>
              <small>
                {notification.dateTime 
                  ? notification.dateTime.toLocaleString() 
                  : "Date not available"}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
