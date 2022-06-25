import React, { useRef } from "react";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import { useDispatch, useSelector } from "react-redux";
import { tweetErrorClear } from "../../features/tweet.slice";
import Loader from "../Loader/Loader.comp";

function TweetComp({
  image,
  setImage,
  textfield,
  setTextfield,
  inHomePage,
  handleOnClick,
}) {
  const { user } = useSelector((state) => state.user);
  const { profilePic } = user;
  const { error, isLoading } = useSelector((state) => state.tweet);

  const dispatch = useDispatch();
  const imageRef = useRef();

  if (error !== "") {
    setTimeout(() => dispatch(tweetErrorClear()), 3000);
  }

  // On each change let user have access to a selected file
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setImage(reader.result);
      };
      reader.onerror = function (error) {
        console.log(error);
      };
    }
  };

  return (
    <div>
      <div className="flex mt-6 space-x-2 px-4">
        {profilePic === "" ? (
          <AccountCircleOutlinedIcon style={{ fontSize: "2rem" }} />
        ) : (
          <img src={profilePic} alt="profile_pic" />
        )}
        <div className="w-full pr-5">
          <textarea
            name="tweet"
            id="tweet"
            rows={(image === "" ? `4` : `2`, inHomePage && `2`)}
            value={textfield}
            onChange={(e) => setTextfield(e.target.value)}
            className="w-full outline-none text-xl text-gray-700 placeholder:text-gray-600 h-max"
            placeholder="What's happening?"
          ></textarea>
          {image !== "" && (
            <div className="relative">
              <div
                className="absolute top-3 left-3 text-white p-1 rounded-full bg-black transition-color cursor-pointer"
                onClick={() => setImage("")}
              >
                <CloseOutlinedIcon />
              </div>
              <img src={image} alt="File" className="w-[30rem] mx-auto" />
            </div>
          )}
          <div className="mt-4 -ml-3 flex-items space-x-2 text-blue-400 font-bold py-0.5 px-2 rounded-full hover:bg-blue-50 transition-color cursor-pointer w-max">
            <PublicOutlinedIcon style={{ fontSize: "1.5rem" }} />
            <h1>Everyone can reply</h1>
          </div>
          <div className="ring-1 ring-gray-100 my-2 w-full" />
          <div className="flex-items justify-between space-x-2 text-blue-500">
            <div className="flex-items">
              <div
                className="tweet-icon"
                onClick={() => imageRef.current.click()}
              >
                <CollectionsOutlinedIcon style={{ fontSize: "1.5rem" }} />
              </div>
              <div className="tweet-icon">
                <GifBoxOutlinedIcon style={{ fontSize: "1.5rem" }} />
              </div>
              <div className="tweet-icon">
                <BarChartOutlinedIcon style={{ fontSize: "1.5rem" }} />
              </div>
              {!inHomePage && (
                <div className="flex-items">
                  <div className="tweet-icon">
                    <SentimentSatisfiedAltOutlinedIcon
                      style={{ fontSize: "1.5rem" }}
                    />
                  </div>
                  <div className="tweet-icon">
                    <ScheduleOutlinedIcon style={{ fontSize: "1.5rem" }} />
                  </div>
                </div>
              )}
              <div className="tweet-icon">
                <LocationOnOutlinedIcon style={{ fontSize: "1.5rem" }} />
              </div>
            </div>

            {inHomePage && (
              <button
                className="py-0.5 px-4 mt-1 grid place-content-center transition-color rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600 w-[25%]"
                onClick={() => handleOnClick()}
              >
                {isLoading ? <Loader forPage={false} /> : <h1>Tweet</h1>}
              </button>
            )}
          </div>
          <input
            type="file"
            name="file"
            ref={imageRef}
            style={{ display: "none" }}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      {error && <h1 className="error err-animation">{error}!</h1>}
    </div>
  );
}

export default TweetComp;
