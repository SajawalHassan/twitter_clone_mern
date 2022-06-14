import React from "react";
import Header from "../components/Header/Header.comp";
import Sidebar from "../components/Sidebar/Sidebar.comp";
import Tweet from "../modals/Tweet.modal";

function Home() {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Header />
        </div>
      </div>

      <Tweet />
    </div>
  );
}

export default Home;
