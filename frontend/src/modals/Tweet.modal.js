import React, { useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loader from "../components/Loader/Loader.comp";

import { useDispatch, useSelector } from "react-redux";
import {
  setTweetModal,
  setTweetPending,
  tweetFail,
  tweetSuccess,
} from "../features/tweet.slice";
import TweetComp from "../components/Tweet/TweetComp.comp";
import protectedAxios from "../utils/protectedAxios";
import { postsSuccess } from "../features/posts.slice";

function Tweet() {
  const [textfield, setTextfield] = useState("");
  const [image, setImage] = useState("");

  const { tweetModalIsOpen, isLoading } = useSelector((state) => state.tweet);

  const dispatch = useDispatch();

  const handleOnClick = async () => {
    dispatch(setTweetPending(true));

    const { error, status } = await protectedAxios({
      url: "posts/create",
      body: { textfield, image },
      method: "post",
    });

    const { data } = await protectedAxios({
      url: "posts/recommendation",
      method: "get",
    });

    dispatch(postsSuccess({ posts: data.posts, ownerInfo: data.ownerInfo }));

    if (error) return dispatch(tweetFail(error));
    if (status === 200) {
      dispatch(tweetSuccess());
      dispatch(setTweetModal(false));
      setTextfield("");
      setImage("");
    }
  };

  return (
    <div
      className={
        tweetModalIsOpen
          ? `h-screen w-screen absolute inset-0 bg-white py-2 z-50`
          : `hidden`
      }
    >
      <div className="flex-items justify-between px-4">
        <div
          className="p-1 cursor-pointer rounded-full hover:bg-gray-200 transition-color"
          onClick={() => dispatch(setTweetModal(false))}
        >
          <ArrowBackIcon style={{ fontSize: "1.5rem" }} />
        </div>
        <button
          className="py-1 px-4 grid place-content-center transition-color rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600 w-2/12"
          onClick={() => handleOnClick()}
        >
          {isLoading ? <Loader forPage={false} /> : <h1>Tweet</h1>}
        </button>
      </div>
      <TweetComp
        textfield={textfield}
        setTextfield={setTextfield}
        image={image}
        setImage={setImage}
      />
    </div>
  );
}

export default Tweet;
