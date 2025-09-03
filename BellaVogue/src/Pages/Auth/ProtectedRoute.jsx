import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../ContextAPI/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  if (role === "admin" && user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  if (role === "user" && !["user", "admin"].includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
