import React from "react";
import { useDispatch } from "react-redux";

import axios from "../axios/axios";
import { loginFail, logout } from "../features/loginSlice";

function Logout() {
  const dispatch = useDispatch();

  const handleOnClick = async (e) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      const res = await axios.delete("/auth/logout", {
        token: refreshToken,
      });

      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      dispatch(logout());
    } catch (error) {
      dispatch(loginFail(error.response.data));
    }
  };

  return (
    <div>
      <button
        onClick={(e) => handleOnClick(e)}
        className="py-3 px-5 bg-blue-500 rounded-sm"
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
