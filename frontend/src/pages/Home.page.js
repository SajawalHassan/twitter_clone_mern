import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.user);

  const { displayname, username, email, _id } = user;

  return (
    <div className="p-4">
      <Link to="/" className="py-2 px-4 rounded-sm bg-blue-500">
        Register page
      </Link>
      <h1 className="text-xl">Name: {displayname}</h1>
      <h1 className="text-lg">Username: @{username}</h1>
      <h1 className="text-lg">email: {email}</h1>
      <p className="text-sm">id: {_id}</p>
    </div>
  );
}

export default Home;
