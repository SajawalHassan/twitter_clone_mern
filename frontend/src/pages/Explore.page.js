import React from "react";
import ExploreHeader from "../components/Explore/ExploreHeader.comp";
import Sidebar from "../components/Sidebar/Sidebar.comp";
import Tweet from "../modals/Tweet.modal";

function Explore() {
  return (
    <div className="flex">
      <Sidebar path="/explore" />
      <div className="w-full">
        <ExploreHeader />
      </div>
      <Tweet />
    </div>
  );
}

export default Explore;
