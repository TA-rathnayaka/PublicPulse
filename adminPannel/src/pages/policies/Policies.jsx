// src/pages/PoliciesPage.js
import React, { useEffect, useState } from 'react';
import { fetchPolicies } from '../../backend/policyService';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Policies Library</h1>
      <div>
        <label>Filter by Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          {/* Add other categories */}
        </select>
      </div>
      <ul>
        {policies.map((policy) => (
          <li key={policy.id} onClick={() => handlePolicyClick(policy.id)}>
            <h3>{policy.title}</h3>
            <p>{policy.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoliciesPage;
