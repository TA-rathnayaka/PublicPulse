import React, { useState, useEffect } from 'react';
import { firestore } from '../../services/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import UploadPolicy from './UploadPolicy';
import './PoliciesPage.scss';

const PoliciesPage = () => {
  const [policies, setPolicies] = useState([]);
  const [sortType, setSortType] = useState('createdDate');

  useEffect(() => {
    const fetchPolicies = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'policies'));
      const policiesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id; 
        if (data.createdDate && data.createdDate.seconds) {
          data.createdDate = new Date(data.createdDate.seconds * 1000).toLocaleDateString();
        }
        return data;
      });
      setPolicies(policiesData);
    };
    fetchPolicies();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, 'policies', id));
    setPolicies(policies.filter(policy => policy.id !== id));
  };

  const sortedPolicies = [...policies].sort((a, b) => {
    if (sortType === 'createdDate') {
      return new Date(b.createdDate) - new Date(a.createdDate);
    } else if (sortType === 'policyName') {
      return (a.policyName || '').localeCompare(b.policyName || '');
    } else if (sortType === 'category') {
      return (a.category || '').localeCompare(b.category || '');
    }
    return 0;
  });

  return (
    <div className="policies-page">
  
      <UploadPolicy />
      <div className="sort-container">
        <label>Sort by: </label>
        <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
          <option value="createdDate">Created Date</option>
          <option value="policyName">Policy Name</option>
          <option value="category">Category</option>
        </select>
      </div>
      <div className="policies-list">
        {sortedPolicies.map((policy, index) => (
          <div key={index} className="policy-ticket">
            <div className="policy-header">{policy.policyName}</div>
            <div className="policy-content">{policy.description}</div>
            <div className="policy-meta">
              <span>Category: {policy.category}</span>
              <span>Section: {policy.sectionNo}</span>
              <span>Created: {policy.createdDate}</span>
            </div>
            <a href={policy.pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
            <button onClick={() => handleDelete(policy.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliciesPage;


