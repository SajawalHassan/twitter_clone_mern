import React, { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import twitterLogo from "../images/twitter_logo.png";
import axios from "../api/axios";
import Loader from "../components/Loader/Loader.comp";

import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setVerificationModalState,
  verificationErrorClear,
  verificationFail,
  setVerificationPending,
} from "../features/verification.slice";
import {
  registerSuccess,
  setRegisterModalState,
  setRegisterPending,
} from "../features/register.slice";
import { setLoginModalState } from "../features/login.slice";
import { useHotkeys } from "react-hotkeys-hook";

function Verification() {
  const [inputCode, setInputCode] = useState("");

  const dispatch = useDispatch();

  const {
    verificationIsOpen,
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

  useHotkeys("esc", () => dispatch(setVerificationModalState(false)));

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
          verificationIsOpen: true,
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
    dispatch(setVerificationModalState(false));
    dispatch(setRegisterModalState(false));
    dispatch(setLoginModalState(true));
  };

  return (
    <div
      className={
        verificationIsOpen
          ? `w-screen h-screen absolute top-0 bg-white md:bg-black md:bg-opacity-[0.004]`
          : `hidden`
      }
    >
      <div className="md:w-[70%] md:h-max pt-[1rem] pb-[28.5rem] lg:w-[60%] xl:w-[50%] 2xl:w-[35%] md:rounded-lg md:inset-0 md:m-auto md:absolute md:bg-white md:max-w-[80vw] md:mx-auto">
        <div className="flex-items w-full">
          <button
            className="p-1 rounded-full hover:bg-gray-300 transition-color ml-3"
            onClick={() => {
              dispatch(
                setVerificationModalState({ verificationIsOpen: false })
              );
              dispatch(setRegisterPending(false));
            }}
          >
            <ArrowBackIcon />
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

      {error && <h1 className="error err-animation">{error}!</h1>}
    </div>
  );
}

export default Verification;
