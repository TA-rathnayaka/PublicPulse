// NotificationsContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { firestore } from "../services/firebaseConfig";
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebaseConfig';

const NotificationsContext = createContext();

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user) {
      const notificationsQuery = query(
        collection(firestore, 'notifications'),
        where('userId', '==', user.uid)
      );

      const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
        const notificationsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNotifications(notificationsData);
      });

      return () => unsubscribe();
    } else {
      setNotifications([]); // Reset notifications if no user is logged in
    }
  }, [user]);

  return (
    <NotificationsContext.Provider value={{ notifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};
