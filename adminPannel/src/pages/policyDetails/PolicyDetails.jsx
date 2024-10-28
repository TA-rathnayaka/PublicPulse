// src/pages/PolicyDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../backend/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const PolicyDetailsPage = () => {
  const { policyId } = useParams();
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    const loadPolicy = async () => {
      try {
        const policyRef = doc(firestore, 'policies', policyId);
        const policyDoc = await getDoc(policyRef);
        if (policyDoc.exists()) {
          setPolicy({ id: policyDoc.id, ...policyDoc.data() });
        }
      } catch (error) {
        console.error('Error fetching policy details:', error);
      }
    };
    loadPolicy();
  }, [policyId]);

  if (!policy) return <p>Loading policy details...</p>;

  return (
    <div>
      <h2>{policy.title}</h2>
      <p>{policy.summary}</p>
      <a href={policy.documentUrl} target="_blank" rel="noopener noreferrer">
        View Full Document
      </a>
    </div>
  );
};

export default PolicyDetailsPage;
