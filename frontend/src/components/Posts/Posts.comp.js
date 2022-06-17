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
        posts.map(({ textfield, image, ownerId }) => (
          <div className="px-3 pt-2 pb-1 border border-gray-100 m-1">
            {ownerInfo &&
              ownerInfo.map(({ _id, displayname, username, profilePic }) => (
                <div>
                  {_id === ownerId && (
                    <div>
                      <div className="flex-items justify-between">
                        <div className="flex-items">
                          <div>
                            {!profilePic ? (
                              <div className="p-2">
                                <AccountCircleOutlinedIcon
                                  style={{ fontSize: "2rem" }}
                                />
                              </div>
                            ) : (
                              <img src={profilePic} alt="profile_pic" />
                            )}
                          </div>
                          <div>
                            <div className="flex-items">
                              <div className="flex-items space-x-1">
                                <h1 className="truncate font-bold">
                                  {displayname}
                                </h1>
                                <h1 className="truncate text-gray-600">
                                  @{username}
                                </h1>
                              </div>
                            </div>
                            <div>
                              <h1>{textfield}</h1>
                            </div>
                          </div>
                        </div>
                        <div className="p-0.5 rounded-full hover:bg-gray-200 cursor-pointer transition-color">
                          <MoreHorizOutlinedIcon />
                        </div>
                      </div>

                      <div className="mx-auto grid place-content-center">
                        <img
                          src={image}
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
                          <div className="tweet-icon hover:bg-red-100">
                            <FavoriteBorderOutlinedIcon />
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
