// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth } from '../services/firebaseConfig'; // Import your firebase config

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const login = async (email, password) => {
    return await auth.signInWithEmailAndPassword(email, password);
  };

  const logout = async () => {
    return await auth.signOut();
  };

  return { user, loading, login, logout };
};

export default useAuth;
