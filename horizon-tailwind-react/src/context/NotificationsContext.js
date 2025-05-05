import React, { createContext, useState, useContext, useEffect } from "react";
import { onSnapshot, collection, query, where, updateDoc, doc, orderBy } from "firebase/firestore";
import { firestore, auth } from "../backend/firebase/firebase"; // adjust path as needed

import { useAuthState } from "react-firebase-hooks/auth";

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [user] = useAuthState(auth); // ✅ Correct destructuring

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(firestore, "notifications"),
      where("userId", "==", user.uid),
      
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt?.toDate?.() || null, // Convert Firestore Timestamp
        };
      });
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
