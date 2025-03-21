// InstituteCard.jsx
import React, { useContext } from 'react';
import { Building, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
 // Import your actual AuthContext
import './InstituteCard.scss';
import { useAuth } from '../../context/authContext';


const InstituteCard = ({ 
  primaryColor = "#4F46E5", // Default indigo color
  secondaryColor = "#818CF8",
  onClick
}) => {
  const navigate = useNavigate();
  const { user, instituteName, instituteId } = useAuth();  // Adjust these properties to match your actual auth context
  

  
  const isRegistered = !!instituteId;
  
  const title = isRegistered 
    ? "Your Institute" 
    : "Register Your Company";
    
  const subtitle = isRegistered 
    ? "Manage your institute settings and users" 
    : "Set up your organization profile to get started";
    
  const icon = isRegistered 
    ? <Building size={28} color="#FFFFFF" /> 
    : <PlusCircle size={28} color="#FFFFFF" />;

  // Set CSS variables for colors
  const cardStyle = {
    '--primary-color': primaryColor,
    '--secondary-color': secondaryColor,
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (isRegistered) {
      // Navigate to institute management page
      navigate('/admin-panel');
    } else {
      // Navigate to institute registration page
      navigate('/sign-up');
    }
  };

  return (
    <div className="institute-card-container" style={cardStyle}>
      <div className="institute-card" onClick={handleClick}>
        {/* Border gradient effect */}
        <div className="institute-card__border"></div>
        
        {/* Icon */}
        <div className="institute-card__icon-wrapper">
          {icon}
        </div>
        
        {/* Content */}
        <div className="institute-card__content">
          <h3 className="institute-card__title">{title}</h3>
          {isRegistered && <p className="institute-card__institute-name">{instituteName}</p>}
          <p className="institute-card__subtitle">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default InstituteCard;