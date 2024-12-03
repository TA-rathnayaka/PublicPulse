// src/pages/PoliciesPage.js
import React, { useEffect, useState } from 'react';
import { fetchPolicies } from '../../backend/policyService';
import { useNavigate } from 'react-router-dom';
import './policies.scss';

const PoliciesPage = () => {
  const [policies, setPolicies] = useState([]);
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadPolicies = async () => {
      const data = await fetchPolicies(category);
      setPolicies(data);
    };
    loadPolicies();
  }, [category]);

  const handlePolicyClick = (policyId) => {
    navigate(`/policies/${policyId}`);
  };

  return (
    <div className="policiesPage">
      <h1 className="policiesHeader">Policies Library</h1>
      <div className="filterSection">
        <label className="filterLabel">Filter by Category:</label>
        <select 
          className="filterSelect" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Environment">Environment</option>
          {/* Add other categories */}
        </select>
      </div>
      <ul className="policyList">
        {policies.map((policy) => (
          <li 
            key={policy.id} 
            className="policyItem" 
            onClick={() => handlePolicyClick(policy.id)}
          >
            <h3 className="policyTitle">{policy.title}</h3>
            <p className="policySummary">{policy.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoliciesPage;
