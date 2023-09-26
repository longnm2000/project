import jwtDecode from "jwt-decode";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateAdminRoutes() {
  const isAdmin = jwtDecode(localStorage.getItem("admin_token")) || null;
  return !!isAdmin ? <Outlet /> : <Navigate to={"/admin/login"} />;
}

export default PrivateAdminRoutes;
