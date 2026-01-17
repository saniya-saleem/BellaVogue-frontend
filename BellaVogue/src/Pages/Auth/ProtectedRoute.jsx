import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../ContextAPI/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext);

  //  Wait until auth state is restored from localStorage
  if (loading) {
    return <div>Loading...</div>; // or spinner component
  }

  //  Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //  Admin-only route protection
  if (role === "admin" && !user.is_staff) {
    return <Navigate to="/home" replace />;
  }

  // User-only route protection
  if (role === "user" && user.is_staff) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Authorized
  return children;
}
