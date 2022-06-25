import React from "react";
import { Link } from "react-router-dom";

function SidebarOptions({ MuiIcon, text, textIsVisible = true, path }) {
  return (
    <Link to={path}>
      <div className="relative flex-items group">
        <div className="rounded-full transition-color cursor-pointer hover:bg-gray-200 p-[7px] w-max h-max">
          {MuiIcon}
        </div>
        <h1
          className={
            textIsVisible
              ? `group-hover:block absolute p-1 font-bold bg-gray-200 left-14 hidden menu-option-anim`
              : `hidden`
          }
        >
          {text}
        </h1>
      </div>
    </Link>
  );
}

export default SidebarOptions;
