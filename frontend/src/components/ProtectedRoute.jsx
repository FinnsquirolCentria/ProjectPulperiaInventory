import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if the user is logged in
  return token ? children : <Navigate to="/users" />; // Redirect to login if not authenticated
};

export default ProtectedRoute;