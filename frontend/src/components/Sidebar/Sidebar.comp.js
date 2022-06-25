import React, { useEffect, useRef, useState } from "react";

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
import Loader from "../Loader/Loader.comp";
import axios from "../../api/axios";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as TweetPic } from "../../images/tweet.svg";
import { setTweetModal } from "../../features/tweet.slice";
import { loginFail, logout, setloginPending } from "../../features/login.slice";
import useOutsideAlerter from "../../hooks/useOutsideAlerter.hook";
import protectedAxios from "../../utils/protectedAxios";

function Sidebar({ path }) {
  const [userInfo, setUserInfo] = useState({});
  const { tweetModalIsOpen } = useSelector((state) => state.tweet);
  const { user } = useSelector((state) => state.user);
  const [sidebarProfileMenuIsOpen, setSidebarProfileMenuIsOpen] =
    useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setSidebarProfileMenuIsOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.login);

  const { _id } = user;
  const { displayname, username, profilePic } = userInfo;

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await protectedAxios({
        url: `users/profile/${_id}`,
        method: "get",
      });

      setUserInfo(data);
    };
    getUserInfo();
  }, [setUserInfo, _id]);

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

  if (isLoading) {
    return (
      <div className="z-50">
        <Loader forPage={true} />
      </div>
    );
  }

  return (
    <div className="w-[20vw] py-2 border-r-[1px] h-screen space-y-2 border-gray-200 flex items-center flex-col sticky top-0 left-0">
      <div className="rounded-full transition-color cursor-pointer hover:bg-blue-100 px-2 py-3 w-max">
        <Link to="/home">
          <img src={twitterLogo} alt="twitter_logo" className="h-7" />
        </Link>
      </div>
      <SidebarOption
        MuiIcon={<HomeOutlinedIcon style={{ fontSize: "2rem" }} />}
        text="Home"
        path="/home"
      />
      <SidebarOption
        MuiIcon={<SearchOutlinedIcon style={{ fontSize: "2rem" }} />}
        text="Explore"
        path="/explore"
      />
      <SidebarOption
        MuiIcon={<NotificationsOutlinedIcon style={{ fontSize: "2rem" }} />}
        text="Notifications"
        path="/home"
      />
      <SidebarOption
        MuiIcon={<MailOutlinedIcon style={{ fontSize: "2rem" }} />}
        text="Messages"
        path="/home"
      />
      <SidebarOption
        MuiIcon={<BookmarkOutlinedIcon style={{ fontSize: "2rem" }} />}
        text="Bookmarks"
        path="/home"
      />
      <SidebarOption
        MuiIcon={<ListAltOutlinedIcon style={{ fontSize: "2rem" }} />}
        text="Lists"
        path="/home"
      />
      <SidebarOption
        MuiIcon={<PersonOutlinedIcon style={{ fontSize: "2rem" }} />}
        text="me"
        path={`/profile/${_id}`}
      />
      <SidebarOption
        MuiIcon={<MoreHorizOutlinedIcon style={{ fontSize: "2rem" }} />}
        text="More"
        path="/home"
      />

      <div
        className="rounded-full transition-color cursor-pointer p-3 w-14 bg-blue-500 hover:bg-blue-700"
        onClick={() => dispatch(setTweetModal(!tweetModalIsOpen))}
      >
        <TweetPic />
      </div>

      <div className="absolute bottom-7">
        {profilePic === "" ? (
          <div>
            {sidebarProfileMenuIsOpen ? (
              <div onClick={() => setSidebarProfileMenuIsOpen(false)}>
                <SidebarOption
                  textIsVisible={false}
                  MuiIcon={<CloseOutlinedIcon style={{ fontSize: "2rem" }} />}
                  path={path}
                />
              </div>
            ) : (
              <div onClick={() => setSidebarProfileMenuIsOpen(true)}>
                <SidebarOption
                  textIsVisible={false}
                  MuiIcon={
                    <AccountCircleOutlinedIcon style={{ fontSize: "2rem" }} />
                  }
                  path={path}
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            {sidebarProfileMenuIsOpen ? (
              <div onClick={() => setSidebarProfileMenuIsOpen(true)}>
                <SidebarOption
                  textIsVisible={false}
                  MuiIcon={<CloseOutlinedIcon style={{ fontSize: "2rem" }} />}
                  path={path}
                />
              </div>
            ) : (
              <img
                src={profilePic}
                alt=""
                className="rounded-full h-[3rem] w-[3rem] cursor-pointer"
                onClick={() => setSidebarProfileMenuIsOpen(true)}
              />
            )}
          </div>
        )}
      </div>

      <div
        className={
          sidebarProfileMenuIsOpen
            ? `absolute bottom-14 left-16 rounded-t-2xl rounded-br-2xl ring-2 ring-gray-200 bg-white w-[60vw] modal-animation`
            : `hidden`
        }
        ref={wrapperRef}
      >
        <div className="flex-items space-x-2 px-2 py-5">
          {profilePic === "" ? (
            <div className="p-2">
              <AccountCircleOutlinedIcon style={{ fontSize: "2rem" }} />
            </div>
          ) : (
            <img
              src={profilePic}
              alt="profile_pic"
              className="h-[3rem] w-[3rem] rounded-full"
            />
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
    </div>
  );
}

export default Sidebar;
