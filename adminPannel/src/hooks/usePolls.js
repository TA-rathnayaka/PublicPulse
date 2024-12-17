// hooks/usePolls.js
import { useState, useEffect } from 'react';
import { fetchPolls } from '../services/pollService';

const usePolls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPolls = async () => {
      setLoading(true);
      try {
        const pollsData = await fetchPolls();
        setPolls(pollsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadPolls();
  }, []);

  return { polls, loading, error };
};

export default usePolls;
