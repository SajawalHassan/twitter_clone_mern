import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar.comp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import protectedAxios from "../utils/protectedAxios";
import Loader from "../components/Loader/Loader.comp";
import Tweet from "../modals/Tweet.modal";
import CalendarMonthIconOutlined from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import EditProfile from "../modals/EditProfile.modal";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setUserIsFollowed } from "../features/profile.slice";

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { _id } = useParams();
  const { userIsFollowed } = useSelector((state) => state.profile);
  const owner = user;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let {
    displayname,
    noOfTweets,
    banner,
    profilePic,
    username,
    date,
    following,
    followers,
    bio,
    location,
    website,
  } = userInfo;

  useEffect(() => {
    setIsLoading(true);

    const getUserInfo = async () => {
      const { data } = await protectedAxios({
        url: `users/profile/${_id}`,
        method: "get",
      });

      setUserInfo(data);
      setIsLoading(false);
    };
    getUserInfo();
  }, [setUserInfo, _id]);

  const createdAt = new Date(date);
  date = createdAt.toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const followUser = async () => {
    const followData = await protectedAxios({
      url: `users/follow/${_id}`,
      method: "put",
    });

    if (followData.data === "User has been followed") {
      dispatch(setUserIsFollowed(true));
    } else {
      dispatch(setUserIsFollowed(false));
    }

    const userData = await protectedAxios({
      url: `users/profile/${_id}`,
      method: "get",
    });

    setUserInfo(userData.data);
  };

  return (
    <div className="flex">
      <EditProfile
        editProfile={editProfile}
        setEditProfile={setEditProfile}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <Sidebar path={`/profile/${_id}`} />
      {isLoading && <Loader forPage={true} />}
      <div className="w-full">
        <div className="flex-items p-2 h-max sticky top-0 z-40">
          <div
            className="p-1 hover:bg-gray-200 transition-color rounded-full cursor-pointer"
            onClick={() => navigate("/home")}
          >
            <ArrowBackIcon className="h-6" />
          </div>
          <div className="ml-6">
            <h1 className="font-bold text-xl">{displayname}</h1>
            <p className="text-gray-600 text-sm">{noOfTweets} Tweets</p>
          </div>
        </div>
        <div>
          {banner ? (
            <img src={banner} alt="" className="w-screen h-[8rem]" />
          ) : (
            <div className="bg-[#CFD9DE] h-[8rem]" />
          )}
          <div className="flex-items justify-between">
            {profilePic ? (
              <img
                src={profilePic}
                alt=""
                className="bg-gray-400 rounded-full h-[5rem] w-[5rem] -mt-12 ml-5 border-4 border-white"
              />
            ) : (
              <div className="bg-gray-400 rounded-full h-[5rem] w-[5rem] -mt-12 ml-5 border-4 border-white" />
            )}
            {_id === owner._id ? (
              <button
                className="px-4 py-0.5 rounded-full mt-2 mr-5 border border-gray-200 font-bold hover:bg-gray-200 transition-color"
                onClick={() => setEditProfile(true)}
              >
                Edit profile
              </button>
            ) : (
              <div>
                {userIsFollowed ? (
                  <button
                    className="px-4 py-0.5 rounded-full mt-2 mr-5 border border-gray-200 font-bold hover:bg-gray-200 transition-color"
                    onClick={() => followUser()}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="px-4 py-0.5 rounded-full mt-2 mr-5 border text-white bg-blue-500 font-bold hover:bg-blue-600 transition-color"
                    onClick={() => followUser()}
                  >
                    Follow
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="ml-5">
            <h1 className="text-xl font-bold">{displayname}</h1>
            <p className="text-sm text-gray-600">@{username}</p>
            {bio && <h1 className="text-[15px] mt-4 pr-4">{bio}</h1>}
            <div className="flex-items space-x-5 my-2">
              {location && (
                <div className="text-gray-600 flex-items">
                  <LocationOnOutlinedIcon style={{ fontSize: "1.5rem" }} />
                  <h1 className="text-sm">{location}</h1>
                </div>
              )}
              {website && (
                <div className="text-gray-600 space-x-1 flex-items">
                  <LinkOutlinedIcon
                    style={{ fontSize: "1.5rem" }}
                    className="-rotate-45"
                  />
                  <a
                    href={website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    {website}
                  </a>
                </div>
              )}
            </div>
            <div className="mt-3 flex-items space-x-1">
              <CalendarMonthIconOutlined
                className="h-6 text-gray-600"
                style={{ fontSize: "1.5rem" }}
              />
              <h1 className="text-gray-600 text-sm">Joined {date}</h1>
            </div>
            <div className="flex-items space-x-5 mt-3 text-sm text-zinc-800">
              <h1>
                <span className="font-bold text-black">
                  {following && following.length}
                </span>{" "}
                following
              </h1>
              <h1>
                <span className="font-bold text-black">
                  {followers && followers.length}
                </span>{" "}
                followers
              </h1>
            </div>
          </div>
          <div className="flex-items mt-2">
            <div className="header-option text-black px-[19.5px] font-bold border-b-4 border-blue-500">
              Tweets
            </div>
            <div className="header-option px-[19.5px]">Tweets & Replies</div>
            <div className="header-option px-[19.5px]">Media</div>
            <div className="header-option px-[19.5px]">Likes</div>
          </div>
        </div>
      </div>
      <Tweet />
    </div>
  );
}

export default Profile;
