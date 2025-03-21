import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext'; // Import your actual AuthContext
import InstituteCard from './InstituteCard';
import './InstituteCard.scss';
import "../../components/Navbar/Navbar";
import './UserDashboard.scss'
const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, userRole, instituteId, instituteName } = useAuth();
  
  // Redirect to login if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="user-dashboard">
      <h2>Your Institutes</h2>
      {/* Render InstituteCard or any relevant component */}
      {instituteId && instituteName && (
        <InstituteCard instituteId={instituteId} instituteName={instituteName} />
      )}

      {/* Conditionally render "Registered Institutes" and "Manage Users" if the user is a superAdmin */}
      {userRole === 'super-admin' && (
        <div className="admin-section">
          <h3>Registered Institutes</h3>
          {/* Here you can render a list of registered institutes */}
          {/* For now, it could be a static list or a placeholder */}
          <ul>
            <li>Institute 1</li>
            <li>Institute 2</li>
            <li>Institute 3</li>
          </ul>
          
          <h3>Manage Users</h3>
          {/* Add logic to manage users, like displaying a list of users with options */}
          <button>Manage Users</button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
