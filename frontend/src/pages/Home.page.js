import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="p-4">
      <Link to="/register" className="py-2 px-4 rounded-sm bg-blue-500">
        Register page
      </Link>
    </div>
  );
}

export default Home;
