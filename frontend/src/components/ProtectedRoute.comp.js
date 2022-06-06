import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const { isAuth } = useSelector((state) => state.login);

  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
