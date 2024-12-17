// services/notificationService.js
import { firestore } from './firebaseService';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';

const notificationCollection = collection(firestore, 'notifications');

const notificationService = {
  sendNotification: async (notificationData) => {
    await addDoc(notificationCollection, notificationData);
  },

  getNotifications: async () => {
    const notificationSnapshot = await getDocs(notificationCollection);
    return notificationSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  markAsRead: async (notificationId) => {
    const notificationRef = doc(firestore, 'notifications', notificationId);
    await updateDoc(notificationRef, { isRead: true });
  }
};

export default notificationService;
