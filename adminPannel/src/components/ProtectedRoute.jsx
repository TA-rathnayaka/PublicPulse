import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Forbidden from "./forbidden/Forbidden";

const ProtectedRoute = ({ children, superAdminOnly = false, adminOnly = false }) => {
  const { user, userRole, loading, roleLoading } = useAuth();

  if (loading || roleLoading) {
    return <div>Loading...</div>; // Show loading while checking auth
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect if not logged in
  }

  // Redirect for non-super-admin users trying to access super-admin-only route
  if (superAdminOnly && userRole !== "super-admin") {
    return <Forbidden/>;
  }

  // Redirect for non-admin users trying to access admin-only route
  if (adminOnly && userRole !== "admin" && userRole !== "super-admin") {
    return <Forbidden/>;
  }

  return children; // If all checks pass, render the children (route)
};

export default ProtectedRoute;
