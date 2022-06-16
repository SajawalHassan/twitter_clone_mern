import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header.comp";
import Sidebar from "../components/Sidebar/Sidebar.comp";
import TweetComp from "../components/Tweet/TweetComp.comp";
import Tweet from "../modals/Tweet.modal";
import protectedAxios from "../utils/protectedAxios";

import { useDispatch, useSelector } from "react-redux";
import {
  setTweetModal,
  setTweetPending,
  tweetFail,
  tweetSuccess,
} from "../features/tweet.slice";
import { postsSuccess, setPostsPending } from "../features/posts.slice";
import Loader from "../components/Loader/Loader.comp";

function Home() {
  const [textfield, setTextfield] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const { isLoading, posts } = useSelector((state) => state.posts);

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

  useEffect(() => {
    dispatch(setPostsPending(true));
    const getPosts = async () => {
      const { data } = await protectedAxios({
        url: "posts/recommendation",
        method: "get",
      });
      dispatch(postsSuccess(data));
    };

    getPosts();
  }, [dispatch]);

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
          {posts.map(({ textfield, image }) => (
            <div>
              <h1>{textfield}</h1>
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      </div>

      <Tweet />
      {isLoading && <Loader forPage={true} />}
    </div>
  );
}

export default Home;
