import React from "react";

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="space-x-4">
      <Link className="py-3 px-5 bg-blue-500" to="/register">
        Register Page
      </Link>
      <Link className="py-3 px-5 bg-blue-500" to="/login">
        Register Page
      </Link>
    </div>
  );
}

export default Home;
