import React, { useState } from "react";
import Header from "../components/Header/Header.comp";
import Sidebar from "../components/Sidebar/Sidebar.comp";
import TweetComp from "../components/Tweet/TweetComp.comp";
import Tweet from "../modals/Tweet.modal";
import protectedAxios from "../utils/protectedAxios";

import { useDispatch } from "react-redux";
import {
  setTweetModal,
  setTweetPending,
  tweetFail,
  tweetSuccess,
} from "../features/tweet.slice";
import Posts from "../components/Posts/Posts.comp";

function Home() {
  const [textfield, setTextfield] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const handleOnClick = async () => {
    dispatch(setTweetPending(true));

    const { error, status } = await protectedAxios({
      url: "posts/create",
      body: { textfield, image },
      method: "post",
    });

    if (error) return dispatch(tweetFail(error));
    if (status === 200) {
      dispatch(tweetSuccess());
      dispatch(setTweetModal(false));
      setTextfield("");
      setImage("");
      dispatch(tweetFail("Your Tweet has been posted"));
    }
  };

  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Header />
          <TweetComp
            textfield={textfield}
            setTextfield={setTextfield}
            image={image}
            setImage={setImage}
            inHomePage={true}
            handleOnClick={() => handleOnClick()}
          />
          <Posts />
        </div>
      </div>

      <Tweet />
    </div>
  );
}

export default Home;
