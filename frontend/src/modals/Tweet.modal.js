import React, { useEffect, useRef, useState } from "react";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Loader from "../components/Loader/Loader.comp";

import { useDispatch, useSelector } from "react-redux";
import {
  setTweetModal,
  setTweetPending,
  tweetErrorClear,
  tweetFail,
  tweetSuccess,
} from "../features/tweet.slice";
import axios from "../api/axios";
import RefreshToken from "../hooks/RefreshToken";

function Tweet() {
  const [textfield, setTextfield] = useState("");
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const { user } = useSelector((state) => state.user);
  const { profilePic } = user;
  const { tweetModalIsOpen, error, isLoading } = useSelector(
    (state) => state.tweet
  );

  const dispatch = useDispatch();
  const imageRef = useRef();

  if (error !== "") {
    setTimeout(() => dispatch(tweetErrorClear()), 3000);
  }

  // Clean up the selection to avoid memory leak
  useEffect(() => {
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setImage(objectURL);
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [selectedFile]);

  // Opening menu to select file
  const showOpenFileDialog = () => {
    imageRef.current.click();
  };

  // On each change let user have access to a selected file
  const handleChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

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
    <div
      className={
        tweetModalIsOpen
          ? `h-screen w-screen absolute inset-0 bg-white py-2 px-4`
          : `hidden`
      }
    >
      <div className="flex-items justify-between">
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
      <div className="flex mt-6 space-x-2 w-screen">
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
      {error && <h1 className="error err-animation">{error}!</h1>}
    </div>
  );
}

export default Tweet;
