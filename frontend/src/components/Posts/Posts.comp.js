import React, { useEffect } from "react";
import protectedAxios from "../../utils/protectedAxios";
import Loader from "../Loader/Loader.comp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";

import { useDispatch, useSelector } from "react-redux";
import { postsSuccess, setPostsPending } from "../../features/posts.slice";

function Posts() {
  const dispatch = useDispatch();

  const { isLoading, posts, ownerInfo } = useSelector((state) => state.posts);
  if (ownerInfo) {
    var { profilePic, displayname, username } = ownerInfo;
  }

  useEffect(() => {
    dispatch(setPostsPending(true));
    const getPosts = async () => {
      const { data } = await protectedAxios({
        url: "posts/recommendation",
        method: "get",
      });
      dispatch(postsSuccess({ posts: data.posts, ownerInfo: data.ownerInfo }));
    };

    getPosts();
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-center mt-5">{isLoading && <Loader />}</div>
      {posts.map(({ textfield, image }) => (
        <div className="px-3 border border-gray-100 mx-1 my-1">
          <div className="flex-items">
            {profilePic === "" ? (
              <div className="pr-2">
                <AccountCircleOutlinedIcon style={{ fontSize: "2.3rem" }} />
              </div>
            ) : (
              <img src={profilePic} alt="profile_pic" />
            )}
            <div>
              <div className="flex-items space-x-2">
                <div className="flex-items justify-between">
                  <div className="flex-items space-x-2">
                    <h1 className="truncate font-bold text-lg">
                      {displayname}
                    </h1>
                    <h1 className="truncate text-gray-600 text-lg">
                      @{username}
                    </h1>
                  </div>
                  <div className="ml-[30%] p-0.5 mt-1 rounded-full hover:bg-gray-200 transition-color cursor-pointer">
                    <MoreHorizOutlinedIcon style={{ fontSize: "2rem" }} />
                  </div>
                </div>
              </div>
              <h1 className="-mt-[6px]">{textfield}</h1>
            </div>
          </div>
          <div className="flex-items flex-col">
            <img
              src={image}
              alt=""
              className={
                image ? `rounded-xl w-[20rem] my-2` : `rounded-xl w-[20rem]`
              }
            />
            <div className="flex-items space-x-2 justify-between w-[80%]">
              <div className="tweet-icon hover:bg-blue-100 p-2">
                <ChatBubbleOutlineOutlinedIcon />
              </div>
              <div className="tweet-icon rotate-90 hover:bg-green-100">
                <CompareArrowsOutlinedIcon />
              </div>
              <div className="tweet-icon hover:bg-red-200">
                <FavoriteBorderOutlinedIcon />
              </div>
              <div className="tweet-icon hover:bg-blue-100">
                <IosShareOutlinedIcon />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
