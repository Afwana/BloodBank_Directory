import React from "react";
import { Navigate } from "react-router-dom";
import { roleRedirects } from "../../utils/roleConfig";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    return <Navigate to={roleRedirects[role] || "/"} replace />;
  }

  return children;
};

export default PublicRoute;
