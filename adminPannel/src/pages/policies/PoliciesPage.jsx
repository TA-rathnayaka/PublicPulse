import React, { useState, useEffect } from 'react';
import { firestore } from '../../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import UploadPolicy from './UploadPolicy';
import './PoliciesPage.scss';

const PoliciesPage = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'policies'));
      const policiesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Convert Firestore Timestamp to a readable date string
        if (data.createdDate && data.createdDate.seconds) {
          data.createdDate = new Date(data.createdDate.seconds * 1000).toLocaleDateString();
        }
        return data;
      });
      setPolicies(policiesData);
    };
    fetchPolicies();
  }, []);

  return (
    <div className="policies-page">
      <h1>Add Your Policy </h1>
      <UploadPolicy />
      <div className="policies-list">
        {policies.map((policy, index) => (
          <div key={index} className="policy-ticket">
            <div className="policy-header">{policy.policyName}</div>
            <div className="policy-content">{policy.description}</div>
            <div className="policy-meta">
              <span>Category: {policy.category}</span>
              <span>Section: {policy.sectionNo}</span>
              <span>Created: {policy.createdDate}</span>
            </div>
            <a href={policy.pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliciesPage;