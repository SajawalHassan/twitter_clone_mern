import React, { useEffect, useState } from "react";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import twitterLogo from "../images/twitter_logo.png";
import axios from "../api/axios";

import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setVerificationModalState,
  verificationErrorClear,
  verificationFail,
  setVerificationPending,
} from "../features/verification.slice";
import { registerSuccess, registerFail } from "../features/register.slice";
import Loader from "../components/Loader.comp";

function Verification() {
  const [inputCode, setInputCode] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isOpen,
    isLoading,
    error,
    code,
    email,
    displayname,
    username,
    password,
    month,
    day,
    year,
  } = useSelector((state) => state.verification);

  useEffect(() => {
    if (isLoading) dispatch(setVerificationPending(false));
    // eslint-disable-next-line
  }, []);

  if (error !== "") {
    setTimeout(() => dispatch(verificationErrorClear()), 3000);
  }

  const sendEmail = async (e) => {
    e.preventDefault();

    dispatch(setVerificationPending(true));
    try {
      const { data } = await axios.post("/users/send_email", {
        email,
      });

      dispatch(
        setVerificationModalState({
          isOpen: true,
          code: data.code,
          displayname,
          username,
          email,
          password,
          month,
          day,
          year,
        })
      );
    } catch (error) {
      dispatch(verificationFail(error.response.data));
    }
  };

  const handleOnClick = async (e) => {
    e.preventDefault();

    if (inputCode !== code) {
      return dispatch(verificationFail("Sorry the code didn't match"));
    }

    dispatch(setVerificationPending(true));
    await axios.post("/auth/register", {
      displayname,
      username,
      email,
      password,
      month,
      day,
      year,
    });

    dispatch(registerSuccess());
    dispatch(
      setVerificationModalState({
        isOpen: false,
      })
    );
    navigate("/");
  };

  return (
    <div
      className={
        isOpen
          ? `w-screen h-screen absolute top-0 bg-white lg:bg-black lg:bg-opacity-50`
          : `hidden`
      }
    >
      <div className="lg:w-[70%] xl:w-[50%] 2xl:w-[40%] lg:h-[70%] lg:rounded-md lg:inset-0 lg:m-auto lg:absolute lg:bg-white md:max-w-[80vw] md:mx-auto">
        <div className="flex-items w-full p-3">
          <button
            className="p-1 rounded-full hover:bg-gray-300 transition-color md:ml-5"
            onClick={() => {
              dispatch(setVerificationModalState({ isOpen: false }));
              dispatch(registerFail(""));
            }}
          >
            <CloseOutlinedIcon />
          </button>

          <img src={twitterLogo} alt="twitter_logo" className="h-6 mx-auto" />
        </div>

        <form className="flex flex-col max-w-[90%] mt-6 mx-auto">
          <h1 className="text-3xl font-bold">Check your email</h1>
          <p className="text-zinc-800 text-sm mt-2">
            You'll receive a code to verify here so you can reset your account
            password.
          </p>
          <TextField
            label="Enter your code"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            variant="outlined"
            sx={{ marginTop: "1.5rem" }}
          />

          {inputCode === "" ? (
            <button
              className="auth-btn absolute bottom-10 w-[90%] md:w-[80%] inset-x-0 mx-auto"
              onClick={(e) => sendEmail(e)}
            >
              {isLoading ? (
                <Loader forPage={false} />
              ) : (
                <h1>Didn't recieve your code?</h1>
              )}
            </button>
          ) : (
            <button
              className={
                !isLoading
                  ? `auth-btn absolute bottom-10 w-[90%] bg-black text-white hover:bg-zinc-800 md:w-[80%] inset-x-0 mx-auto`
                  : `auth-btn absolute bottom-10 w-[90%] bg-black text-white hover:bg-zinc-800 md:w-[80%] inset-x-0 mx-auto cursor-not-allowed`
              }
              type="submit"
              onClick={(e) => {
                if (!isLoading) {
                  handleOnClick(e);
                } else {
                  e.preventDefault();
                }
              }}
            >
              {isLoading ? <Loader forPage={false} /> : <h1>Verify</h1>}
            </button>
          )}
        </form>
      </div>

      {error && (
        <h1 className="absolute bottom-0 p-2 w-full text-white font-bold bg-blue-500 text-center lg:w-max lg:px-5 lg:bottom-5 lg:inset-x-0 lg:mx-auto lg:rounded-lg lg:ring-2 lg:ring-blue-600">
          {error}!
        </h1>
      )}
    </div>
  );
}

export default Verification;
