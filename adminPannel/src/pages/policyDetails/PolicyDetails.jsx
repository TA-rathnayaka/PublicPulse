import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './PolicyDetails.scss';

const PolicyDetails = () => {
  const { policyId } = useParams();
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      const docRef = doc(firestore, 'policies', policyId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPolicy(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };
    fetchPolicy();
  }, [policyId]);

  if (!policy) {
    return <p>Loading policy details...</p>;
  }

  return (
    <div className="policy-details">
      <h1>{policy.title}</h1>
      {policy.imageUrl && <img src={policy.imageUrl} alt={policy.title} className="policy-image" />}
      <p><strong>Description:</strong> <hr></hr>{policy.description}</p>
      <p><strong>Category:</strong> {policy.category}</p>
      <p><strong>Created Date:</strong> {policy.createdDate}</p>
      <p><strong>Approval Date:</strong> {policy.approvalDate}</p>
      <p><strong>Approved By:</strong> {policy.approvedBy}</p>
      <p><strong>Assigned To:</strong> {policy.assignedTo}</p>
      <p><strong>Created By:</strong> {policy.createdBy}</p>
      <p><strong>Effective Date:</strong> {policy.effectiveDate}</p>
      <p><strong>Expiry Date:</strong> {policy.expiryDate}</p>
      <p><strong>Notes:</strong> {policy.notes}</p>
      <p><strong>Status:</strong> {policy.status}</p>
      <p><strong>Tags:</strong> {policy.tags.join(', ')}</p>
      <p><strong>Is Active:</strong> {policy.isActive ? 'Yes' : 'No'}</p>
      <a href={policy.pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
    </div>
  );
};

export default PolicyDetails;
