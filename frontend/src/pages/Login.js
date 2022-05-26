import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form className="space-x-4 m-5">
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

export default Login;
