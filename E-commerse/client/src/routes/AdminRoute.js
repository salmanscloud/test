import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/authAPI";

const AdminRoute = ({ children }) => {
  const auth = isAuthenticated();
  return auth && auth.user.role === 1 ? children : <Navigate to="/" />;
};

export default AdminRoute;
