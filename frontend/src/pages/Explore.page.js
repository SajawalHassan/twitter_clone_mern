import React from "react";
import ExploreHeader from "../components/Explore/ExploreHeader.comp";
import Sidebar from "../components/Sidebar/Sidebar.comp";

function Explore() {
  return (
    <div className="flex">
      <Sidebar path="/explore" />
      <ExploreHeader />
    </div>
  );
}

export default Explore;
