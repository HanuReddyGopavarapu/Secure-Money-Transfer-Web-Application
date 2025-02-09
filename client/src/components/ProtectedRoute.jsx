import React from "react";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/signin" replace />; // Redirect to /signin if user is not logged in
  }
  return <Outlet />; // Render the protected route if user is logged in
};

export default ProtectedRoute;