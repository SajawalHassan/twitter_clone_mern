import React, { useState } from "react";

import { useDispatch } from "react-redux";
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

  const handleOnClick = async (e) => {
    e.preventDefault();

    dispatch(registerPending());
    try {
      const { data, status } = await axios.post("/auth/register", {
        displayName,
        username,
        email,
        password,
      });

      dispatch(registerSuccess());
      console.log({ data, status });
    } catch (error) {
      dispatch(registerFail(error.response.data));
      console.log(error.response.data);
    }
  };

  return (
    <div>
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
    </div>
  );
}

export default Register;
