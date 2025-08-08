import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    // Redirect to login if token is missing
    return <Navigate to="/log" replace />;
  }

  return children;
};

export default ProtectedRoute;