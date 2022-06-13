import React from "react";
import Sidebar from "../components/Sidebar/Sidebar.comp";
import Tweet from "../modals/Tweet.modal";

function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <Tweet />
    </div>
  );
}

export default Home;
