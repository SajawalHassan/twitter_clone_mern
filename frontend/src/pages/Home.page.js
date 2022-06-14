import React, { useState } from "react";
import Header from "../components/Header/Header.comp";
import Sidebar from "../components/Sidebar/Sidebar.comp";
import TweetComp from "../components/Tweet/TweetComp.comp";
import Tweet from "../modals/Tweet.modal";

import { useDispatch } from "react-redux";
import {
  setTweetPending,
  tweetFail,
  tweetSuccess,
} from "../features/tweet.slice";
import axios from "../api/axios";
import RefreshToken from "../hooks/RefreshToken";

function Home() {
  const [textfield, setTextfield] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const handleOnClick = async () => {
    dispatch(setTweetPending(true));

    try {
      const accessToken = sessionStorage.getItem("accessToken");
      await axios.post(
        "/posts/create",
        { textfield: textfield, picture: image },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      dispatch(tweetSuccess());
      setImage("");
      setTextfield("");
    } catch (error) {
      if (error.response.status === 403) {
        await RefreshToken();
        try {
          const accessToken = sessionStorage.getItem("accessToken");
          await axios.post(
            "/posts/create",
            { textfield },
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          dispatch(tweetSuccess());
          setImage("");
          setTextfield("");
        } catch (error) {
          dispatch(tweetFail(error.response.data));
        }
      } else {
        dispatch(tweetFail(error.response.data));
      }
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
        </div>
      </div>

      <Tweet />
    </div>
  );
}

export default Home;
