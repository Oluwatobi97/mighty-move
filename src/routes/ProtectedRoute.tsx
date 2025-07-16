import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Placeholder auth check. Replace with real logic.
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const ProtectedRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
