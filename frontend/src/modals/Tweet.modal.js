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

function Tweet() {
  const [textfield, setTextfield] = useState("");
  const [image, setImage] = useState("");

  const { tweetModalIsOpen, isLoading } = useSelector((state) => state.tweet);

  const dispatch = useDispatch();

  const handleOnClick = async () => {
    dispatch(setTweetPending(true));

    const { error, status } = await protectedAxios({
      url: "posts/create",
      body: { textfield, picture: image },
      method: "post",
    });

    if (error) return dispatch(tweetFail(error));
    if (status === 200) {
      dispatch(tweetSuccess());
      dispatch(setTweetModal(false));
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
      {/* <div className="flex mt-6 space-x-2 w-screen">
        {profilePic === "" ? (
          <AccountCircleOutlinedIcon style={{ fontSize: "2rem" }} />
        ) : (
          <img src={profilePic} alt="profile_pic" />
        )}
        <div className="w-full pr-5">
          <textarea
            name="tweet"
            id="tweet"
            rows={image === "" ? `4` : `2`}
            value={textfield}
            onChange={(e) => setTextfield(e.target.value)}
            className="w-full outline-none text-xl text-gray-700 placeholder:text-gray-600"
            placeholder="What's happening?"
          ></textarea>
          {image !== "" && (
            <div className="relative">
              <div
                className="absolute top-3 left-3 text-white p-1 rounded-full bg-black transition-color cursor-pointer"
                onClick={() => {
                  setImage("");
                  setSelectedFile(null);
                }}
              >
                <CloseOutlinedIcon />
              </div>
              <img src={image} alt="File" className="w-[30rem] mx-auto" />
            </div>
          )}
          <div className="mt-4 flex-items space-x-2 text-blue-400 font-bold py-0.5 px-2 rounded-full hover:bg-blue-50 transition-color cursor-pointer w-max">
            <PublicOutlinedIcon style={{ fontSize: "1.5rem" }} />
            <h1>Everyone can reply</h1>
          </div>
          <div className="ring-1 ring-gray-100 my-2 w-[75%]" />
          <div className="flex-items space-x-2 text-blue-500">
            <div className="tweet-icon" onClick={() => showOpenFileDialog()}>
              <CollectionsOutlinedIcon style={{ fontSize: "1.5rem" }} />
            </div>
            <div className="tweet-icon">
              <GifBoxOutlinedIcon style={{ fontSize: "1.5rem" }} />
            </div>
            <div className="tweet-icon">
              <BarChartOutlinedIcon style={{ fontSize: "1.5rem" }} />
            </div>
            <div className="tweet-icon">
              <SentimentSatisfiedAltOutlinedIcon
                style={{ fontSize: "1.5rem" }}
              />
            </div>
            <div className="tweet-icon">
              <ScheduleOutlinedIcon style={{ fontSize: "1.5rem" }} />
            </div>
            <div className="tweet-icon">
              <LocationOnOutlinedIcon style={{ fontSize: "1.5rem" }} />
            </div>
          </div>
          <input
            type="file"
            name="file"
            ref={imageRef}
            style={{ display: "none" }}
            onChange={(event) => handleChange(event)}
          />
        </div>
      </div>
      {error && <h1 className="error err-animation">{error}!</h1>} */}
    </div>
  );
}

export default Tweet;
