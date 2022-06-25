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

  const likeTweet = async (posts) => {
    try {
      await protectedAxios({
        url: `posts/like/${posts._id}`,
        method: "put",
      });

      const { data } = await protectedAxios({
        url: "posts/recommendation",
        method: "get",
      });

      dispatch(postsSuccess({ posts: data.posts, ownerInfo: data.ownerInfo }));
    } catch (error) {
      console.log(error);
    }
  };

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
      {posts &&
        posts.map((posts) => (
          <div
            className="px-3 pt-2 pb-1 border border-gray-100 m-1"
            key={posts._id}
          >
            {ownerInfo &&
              ownerInfo.map((ownerInfo) => (
                <div key={ownerInfo._id}>
                  {ownerInfo._id === posts.ownerId && (
                    <div>
                      <div className="flex-items justify-between">
                        <div className="flex-items">
                          <div>
                            {!ownerInfo.profilePic ? (
                              <div className="p-2">
                                <AccountCircleOutlinedIcon
                                  style={{ fontSize: "2rem" }}
                                />
                              </div>
                            ) : (
                              <img
                                src={ownerInfo.profilePic}
                                alt="profile_pic"
                                className="w-[2.5rem] rounded-full mr-3"
                              />
                            )}
                          </div>
                          <div>
                            <div className="flex-items">
                              <div className="flex-items space-x-1">
                                <h1 className="truncate font-bold">
                                  {ownerInfo.displayname}
                                </h1>
                                <h1 className="truncate text-gray-600">
                                  @{ownerInfo.username}
                                </h1>
                              </div>
                            </div>
                            <div>
                              <h1>{posts.textfield}</h1>
                            </div>
                          </div>
                        </div>
                        <div className="pl-3">
                          <div className="p-0.5 rounded-full hover:bg-gray-200 cursor-pointer transition-color">
                            <MoreHorizOutlinedIcon />
                          </div>
                        </div>
                      </div>

                      <div className="mx-auto grid place-content-center">
                        <img
                          src={posts.image}
                          alt=""
                          className="rounded-xl w-[18rem] my-1"
                        />
                        <div className="flex-items justify-between">
                          <div className="tweet-icon">
                            <ChatBubbleOutlineOutlinedIcon />
                          </div>
                          <div className="tweet-icon hover:bg-green-100">
                            <CompareArrowsOutlinedIcon />
                          </div>
                          <div
                            className="flex-items hover:text-red-500 transition-color space-x-1 cursor-pointer"
                            onClick={() => likeTweet(posts)}
                          >
                            <FavoriteBorderOutlinedIcon />
                            <h1>{posts.likes.length}</h1>
                          </div>
                          <div className="tweet-icon">
                            <IosShareOutlinedIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ))}
    </div>
  );
}

export default Posts;
