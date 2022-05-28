import React from "react";

import { Link } from "react-router-dom";
import Logout from "../components/Logout";

function Home() {
  return (
    <div className="space-x-4 m-5 flex items-center">
      <Link className="py-3 px-5 bg-blue-500" to="/register">
        Register Page
      </Link>
      <Link className="py-3 px-5 bg-blue-500" to="/login">
        Login Page
      </Link>
      <Logout />
    </div>
  );
}

export default Home;
