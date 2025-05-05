import React, { createContext, useState, useContext, useEffect } from "react";
import {
  onSnapshot,
  collection,
  query,
  where,
  updateDoc,
  doc,
  orderBy,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { firestore, auth } from "../backend/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  // Notification list state
  const [notifications, setNotifications] = useState([]);
  const [user] = useAuthState(auth);
  
  // Notification preferences state (push notifications and others)
  const [notificationPreferences, setNotificationPreferences] = useState({
    // Default - we'll update this from Firestore if available
    pushNotifications: true,
    emailNotifications: true,
    monthlyNewsletter: false,
    productUpdates: true,
    securityAlerts: true,
    accountActivity: true
  });
  
  const [loading, setLoading] = useState(true);

  // Initialize pushNotifications from localStorage for immediate UI response
  // This provides a seamless experience even before Firestore data loads
  useEffect(() => {
    const savedPushSetting = localStorage.getItem("pushNotifications");
    if (savedPushSetting !== null) {
      setNotificationPreferences(prev => ({
        ...prev,
        pushNotifications: JSON.parse(savedPushSetting)
      }));
    }
  }, []);

  // Save pushNotifications to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pushNotifications", JSON.stringify(notificationPreferences.pushNotifications));
  }, [notificationPreferences.pushNotifications]);

  // Fetch notification preferences from Firestore
  useEffect(() => {
    const fetchNotificationPreferences = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const notificationsDocRef = doc(firestore, "userNotifications", user.uid);
        const notificationsSnapshot = await getDoc(notificationsDocRef);
        
        if (notificationsSnapshot.exists()) {
          // Update state with Firestore data while preserving defaults for any missing fields
          setNotificationPreferences(prev => ({
            ...prev,
            ...notificationsSnapshot.data()
          }));
        } else {
          // Initialize preferences in Firestore with current state
          await setDoc(notificationsDocRef, notificationPreferences);
        }
      } catch (error) {
        console.error("Error fetching notification preferences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationPreferences();
  }, [user]);

  // Fetch actual notifications if user exists and notifications are enabled
  useEffect(() => {
    if (!user || !notificationPreferences.pushNotifications) {
      console.log("Notifications are disabled or user not authenticated");
      return;
    }

    const q = query(
      collection(firestore, "notifications"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt?.toDate?.() || null,
        };
      });
      setNotifications(data);
    });

    return () => unsub();
  }, [user, notificationPreferences.pushNotifications]);

  // Mark a notification as read
  const markAsRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "read" } : n))
    );
    const ref = doc(firestore, "notifications", id);
    await updateDoc(ref, { status: "read" });
  };

  // Update a notification preference
  const updateNotificationPreference = async (key, value) => {
    if (!user) return false;
    
    try {
      // Update in state immediately for responsive UI
      setNotificationPreferences(prev => ({
        ...prev,
        [key]: value
      }));
      
      // Special handling for pushNotifications to clear notifications array if disabled
      if (key === "pushNotifications" && value === false) {
        setNotifications([]);
      }
      
      // Update in Firestore
      const notificationsDocRef = doc(firestore, "userNotifications", user.uid);
      await updateDoc(notificationsDocRef, {
        [key]: value
      });
      
      return true;
    } catch (error) {
      console.error(`Error updating ${key} preference:`, error);
      
      // Revert state if update fails
      setNotificationPreferences(prev => ({
        ...prev,
        [key]: !value
      }));
      
      return false;
    }
  };

  // For backward compatibility with existing code
  const toggleNotifications = (enabled) => {
    updateNotificationPreference("pushNotifications", enabled);
  };

  return (
    <NotificationsContext.Provider
      value={{
        // Notification list features
        notifications,
        markAsRead,
        notificationsEnabled: notificationPreferences.pushNotifications,
        toggleNotifications,
        
        // New preference features
        notificationPreferences,
        updateNotificationPreference,
        loading
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);