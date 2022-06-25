import React, { useEffect } from "react";

import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginFail } from "../../features/login.slice";

function ProtectedRoute() {
  const { isAuth } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("refreshToken") & isAuth) {
      dispatch(loginFail(""));
      navigate("/");
    }
  }, [dispatch, isAuth, navigate]);

  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
