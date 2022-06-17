import React, { useRef } from "react";

import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import useOutsideAlerter from "../../hooks/useOutsideAlerter.hook";

import { ReactComponent as Star } from "../../images/star.svg";
import { useSelector } from "react-redux";

function HeaderMenu() {
  const { headerMenuIsOpen } = useSelector((state) => state.header);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div
      className={
        headerMenuIsOpen
          ? `absolute bg-white right-5 top-5 shadow-lg w-[80%] rounded-md modal-animation`
          : `hidden`
      }
      ref={wrapperRef}
    >
      <div className="grid place-content-center py-2">
        <div className="w-16 mx-auto">
          <Star />
        </div>
        <h1 className="px-2 text-xl font-bold">
          Home show you top Tweet first
        </h1>
      </div>
      <div className="ring-1 ring-gray-200" />
      <div>
        <div className="flex-items space-x-4 py-4 px-2 hover:bg-gray-200 cursor-pointer transition-color">
          <CompareArrowsOutlinedIcon
            style={{
              fontSize: "1.7rem",
              marginLeft: "8px",
              color: "gray",
            }}
          />
          <div>
            <h1>Add an existing account</h1>
            <p className="text-sm text-zinc-600">
              You'll see latest tweets as they happen
            </p>
          </div>
        </div>
        <div className="flex-items space-x-4 py-4 px-2 hover:bg-gray-200 cursor-pointer transition-color rounded-b-lg">
          <SettingsOutlinedIcon
            style={{
              fontSize: "1.7rem",
              marginLeft: "8px",
              color: "gray",
            }}
          />
          <h1>View content preferences</h1>
        </div>
      </div>
    </div>
  );
}

export default HeaderMenu;
