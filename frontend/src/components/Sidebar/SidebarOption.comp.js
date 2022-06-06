import React from "react";

import { Link } from "react-router-dom";

function SidebarOptions({ MuiIcon }) {
  return (
    <div className="rounded-full transition-color cursor-pointer hover:bg-gray-300 p-[7px] w-max h-max">
      {MuiIcon}
    </div>
  );
}

export default SidebarOptions;
