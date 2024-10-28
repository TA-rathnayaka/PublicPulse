import React, { useEffect, useState } from 'react';
import { firestore } from "../../backend/firebase/firebase"; // Adjust this path as necessary
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth"; // Correctly import useAuthState
import { auth } from "../../backend/firebase/firebase"; // Ensure you import auth correctly
import './notifications.scss'
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, loadingAuth] = useAuthState(auth); // Use useAuthState to get user state

  const fetchUserNotifications = async (userId) => {
    if (!userId) {
      console.error("User ID is undefined or invalid.");
      return [];
    }
  
    const userRef = doc(firestore, "users", userId);
    try {
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return userDoc.data().notifications || [];
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
      if (loadingAuth) return; // Wait for auth loading to complete
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
              <small>{new Date(notification.dateTime).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
