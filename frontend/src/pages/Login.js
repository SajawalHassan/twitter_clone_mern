import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFail, loginPending, loginSuccess } from "../features/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../actions/userAction";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import axios from "../axios/axios";

function Login() {
  const [email, setEmail] = useState("bob@gmail.com");
  const [password, setPassword] = useState("123456789");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading } = useSelector((state) => state.login);

  useEffect(() => {
    sessionStorage.getItem("accessToken") && navigate("/");
  }, [navigate]);

  const handleOnClick = async (e) => {
    e.preventDefault();

    dispatch(loginPending());
    try {
      const { data, status } = await axios.post("/auth/login", {
        email,
        password,
      });

      if (status === 200) {
        sessionStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      dispatch(loginSuccess());
      dispatch(getUserProfile());
      navigate("/");
    } catch (error) {
      dispatch(loginFail(error.response.data));
    }
  };

  return (
    <div>
      <div className="bg-gray-200 w-screen h-screen grid place-items-center">
        <div className="bg-white w-[30vw] h-[80vh] rounded-md">
          <CloseOutlinedIcon />
          <form className="space-x-4">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 pl-2 rounded-sm border-2 border-gray-300"
              placeholder="Email"
            />
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 pl-2 rounded-sm border-2 border-gray-300"
              placeholder="Password"
            />

            <button
              type="submit"
              onClick={(e) => handleOnClick(e)}
              className="w-28 h-10 bg-blue-500 rounded-sm"
            >
              {isLoading ? (
                <div
                  style={{ borderTopColor: "transparent" }}
                  className="w-6 h-6 border-[3px] border-red-500 rounded-full animate-spin mx-auto"
                />
              ) : (
                <h1 className="text-white font-bold">Login</h1>
              )}
            </button>
          </form>
          <div className="space-x-2">
            <Link to="/register" className="py-3 px-5 bg-blue-500 rounded-sm">
              Register Page
            </Link>
            <Link to="/" className="py-3 px-5 bg-blue-500 rounded-sm">
              Home Page
            </Link>
          </div>
        </div>
        <div
          className={error ? `text-red-500 font-bold text-center` : `hidden`}
        >
          {error}
        </div>
      </div>
    </div>
  );
}

export default Login;
