import React, { useRef } from "react";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import useOutsideAlerter from "../../hooks/useOutsideAlerter.hook";
import axios from "../../api/axios";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginFail, logout, setloginPending } from "../../features/login.slice";

function SidebarProfileMenu() {
  const { sidebarProfileMenuIsOpen } = useSelector((state) => state.sidebar);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { displayname, username, profilePic } = user;

  const handleOnClick = async (e) => {
    e.preventDefault();

    dispatch(setloginPending(true));
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await axios.delete("/auth/logout", {
        token: refreshToken,
      });

      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      dispatch(loginFail(error.response.data));
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={
        sidebarProfileMenuIsOpen
          ? `absolute bottom-14 left-16 rounded-t-2xl rounded-br-2xl ring-2 ring-gray-200 bg-white w-[60vw] modal-animation`
          : `hidden`
      }
    >
      <div className="flex-items space-x-2 px-2 py-5">
        {profilePic === "" ? (
          <div className="p-2">
            <AccountCircleOutlinedIcon style={{ fontSize: "2rem" }} />
          </div>
        ) : (
          <img src={profilePic} alt="profile_pic" />
        )}
        <div>
          <h1 className="text-xl font-bold truncate">{displayname}</h1>
          <p className="text-gray-600">@{username}</p>
        </div>
      </div>
      <div className="ring-1 ring-gray-200" />
      <div>
        <h1 className="py-4 px-2 hover:bg-gray-200 cursor-pointer transition-color">
          Add an existing account
        </h1>
        <h1
          className="py-4 px-2 hover:bg-gray-200 cursor-pointer transition-color rounded-br-2xl"
          onClick={(e) => handleOnClick(e)}
        >
          Log out @{username}
        </h1>
      </div>
    </div>
  );
}

export default SidebarProfileMenu;
