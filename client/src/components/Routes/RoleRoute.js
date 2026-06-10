import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { roleRedirects } from "../../utils/roleConfig";

const RoleRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role || localStorage.getItem("role");

  if (role && !allowedRoles.includes(role)) {
    return <Navigate to={roleRedirects[role] || "/login"} replace />;
  }

  return children;
};

export default RoleRoute;
