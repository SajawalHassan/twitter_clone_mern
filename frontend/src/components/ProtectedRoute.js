import React, { useEffect } from "react";

import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/loginSlice";

function PrivateRoute() {
  const { isAuth } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  useEffect(() => {
    sessionStorage.getItem("accessToken") && dispatch(loginSuccess());
  }, [dispatch]);

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
