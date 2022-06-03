import React, { useEffect, useState } from "react";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import twitterLogo from "../images/twitter_logo.png";
import axios from "../api/axios";

import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessToVerificationPage,
  verificationErrorClear,
  verificationFail,
  setVerificationPending,
} from "../features/verification.slice";
import { registerSuccess } from "../features/register.slice";
import Loader from "../components/Loader.comp";

function Verification() {
  const [inputCode, setInputCode] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    accessToVerificationPage,
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
  });

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
        setAccessToVerificationPage({ access: true, code: data.code, email })
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
    navigate("/");
  };

  useEffect(() => {
    !accessToVerificationPage && navigate("/register");
  }, [accessToVerificationPage, navigate]);

  return (
    <div>
      <div className="flex-items w-full p-3">
        <Link
          to="/register"
          className="p-1 rounded-full hover:bg-gray-300 transition-color"
        >
          <CloseOutlinedIcon />
        </Link>

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
            className="auth-btn absolute bottom-4 w-[90%]"
            onClick={(e) => sendEmail(e)}
          >
            Didn't recieve your code?
          </button>
        ) : (
          <button
            className="auth-btn absolute bottom-4 w-[90%] bg-black text-white hover:bg-zinc-800"
            type="submit"
            onClick={(e) => handleOnClick(e)}
          >
            {isLoading ? <Loader forPage={false} /> : <h1>Verify</h1>}
          </button>
        )}
      </form>
      {error && (
        <h1 className="absolute bottom-0 p-2 w-full text-white font-bold bg-blue-500 text-center">
          {error}!
        </h1>
      )}
    </div>
  );
}

export default Verification;
