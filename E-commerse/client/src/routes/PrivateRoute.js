import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/authAPI";

const PrivateRoute = ({ children }) => {
  const auth = isAuthenticated();
  return auth && auth.user.role === 0 ? children : <Navigate to="/" />;
};

export default PrivateRoute;
