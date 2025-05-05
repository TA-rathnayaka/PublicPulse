import React, { createContext, useState, useContext, useEffect } from "react";
import { onSnapshot, collection, query, where, updateDoc, doc } from "firebase/firestore";
import { firestore, auth } from "../backend/firebase/firebase"; // adjust path as needed

import { useAuthState } from "react-firebase-hooks/auth";

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuthState(auth); // Must return user.id or user.uid

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(firestore, "notifications"),
      where("userId", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(data);
    });

    return () => unsub();
  }, [user]);

  const markAsRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "read" } : n))
    );
    const ref = doc(firestore, "notifications", id);
    await updateDoc(ref, { status: "read" });
  };

  return (
    <NotificationsContext.Provider value={{ notifications, markAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);
