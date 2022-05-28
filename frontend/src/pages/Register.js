import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  registerFail,
  registerPending,
  registerSuccess,
} from "../features/registerSlice";

import axios from "../axios/axios";

function Register() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, isLoading, error } = useSelector((state) => state.register);

  useEffect(() => {
    (isAuth || sessionStorage.getItem("accessToken")) && navigate("/");
  }, [isAuth, navigate]);

  const handleOnClick = async (e) => {
    e.preventDefault();

    dispatch(registerPending());
    try {
      // eslint-disable-next-line
      const { data, status } = await axios.post("/auth/register", {
        displayName,
        username,
        email,
        password,
      });

      dispatch(registerSuccess());
      navigate("/login");
    } catch (error) {
      dispatch(registerFail(error.response.data));
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <form className="space-x-4 m-5">
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="bg-gray-200 pl-2 rounded-sm border-2 border-gray-300"
            placeholder="Displayname"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-200 pl-2 rounded-sm border-2 border-gray-300"
            placeholder="Username"
          />
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
            className="py-3 px-5  bg-blue-500 rounded-sm"
          >
            Register
          </button>
        </form>
        <div className="space-x-2">
          <Link to="/login" className="py-3 px-5 bg-blue-500 rounded-sm">
            Login Page
          </Link>
          <Link to="/" className="py-3 px-5 bg-blue-500 rounded-sm">
            Home Page
          </Link>
        </div>
      </div>
      <h1 className={error ? `text-red-500 font-bold text-center` : `hidden`}>
        {error}
      </h1>
    </div>
  );
}

export default Register;
