import React, { useRef } from "react";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import twitterLogo from "../../images/twitter_logo.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/Notifications";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SidebarOption from "./SidebarOption.comp";
import useOutsideAlerter from "../../hooks/useOutsideAlerter.hook";
import axios from "../../api/axios";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as TweetPic } from "../../images/tweet.svg";
import { loginFail, logout, setloginPending } from "../../features/login.slice";
import { setSidebarProfileMenuIsOpen } from "../../features/sidebar.slice";
import { setTweetModal } from "../../features/tweet.slice";
import Loader from "../Loader/Loader.comp";

function Sidebar() {
  const { sidebarProfileMenuIsOpen } = useSelector((state) => state.sidebar);
  const { tweetModalIsOpen } = useSelector((state) => state.tweet);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.login);
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
    <div className="px-4 py-2 border-r-[1px] h-screen space-y-2 border-gray-200 flex items-center flex-col">
      <div className="rounded-full transition-color cursor-pointer hover:bg-blue-100 px-2 py-3 w-max">
        <Link to="/home">
          <img src={twitterLogo} alt="twitter_logo" className="h-7" />
        </Link>
      </div>
      <SidebarOption
        MuiIcon={<HomeOutlinedIcon style={{ fontSize: "2rem" }} />}
        text="Home"
      />
      <SidebarOption
        MuiIcon={<SearchOutlinedIcon style={{ fontSize: "2rem" }} />}
        text="Explore"
      />
      <SidebarOption
        MuiIcon={<NotificationsOutlinedIcon style={{ fontSize: "2rem" }} />}
        text="Notifications"
      />
      <SidebarOption
        MuiIcon={<MailOutlinedIcon style={{ fontSize: "2rem" }} />}
        text="Messages"
      />
      <SidebarOption
        MuiIcon={<BookmarkOutlinedIcon style={{ fontSize: "2rem" }} />}
        text="Bookmarks"
      />
      <SidebarOption
        MuiIcon={<ListAltOutlinedIcon style={{ fontSize: "2rem" }} />}
        text="Lists"
      />
      <SidebarOption
        MuiIcon={<PersonOutlinedIcon style={{ fontSize: "2rem" }} />}
        text="Profile"
      />
      <SidebarOption
        MuiIcon={<MoreHorizOutlinedIcon style={{ fontSize: "2rem" }} />}
        text="More"
      />

      <div
        className="rounded-full transition-color cursor-pointer p-3 w-14 bg-blue-500 hover:bg-blue-700"
        onClick={() => dispatch(setTweetModal(!tweetModalIsOpen))}
      >
        <TweetPic />
      </div>

      {profilePic === "" ? (
        <div className="absolute bottom-7">
          {sidebarProfileMenuIsOpen ? (
            <div onClick={() => dispatch(setSidebarProfileMenuIsOpen(true))}>
              <SidebarOption
                textIsVisible={false}
                MuiIcon={<CloseOutlinedIcon style={{ fontSize: "2rem" }} />}
              />
            </div>
          ) : (
            <div onClick={() => dispatch(setSidebarProfileMenuIsOpen(true))}>
              <SidebarOption
                textIsVisible={false}
                MuiIcon={
                  <AccountCircleOutlinedIcon style={{ fontSize: "2rem" }} />
                }
              />
            </div>
          )}
        </div>
      ) : (
        <img src={profilePic} alt="profile_pic" />
      )}

      {sidebarProfileMenuIsOpen && (
        <div
          ref={wrapperRef}
          className="absolute bottom-10 left-16 rounded-t-2xl rounded-br-2xl ring-2 ring-gray-200 bg-white w-[60vw] modal-animation"
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
      )}
      {isLoading && <Loader forPage={true} />}
    </div>
  );
}

export default Sidebar;
