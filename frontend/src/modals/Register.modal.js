import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "../api/axios";
import Loader from "../components/Loader.comp";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import twitterLogo from "../images/twitter_logo.png";
import Verification from "../modals/Verification.modal";

import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slider,
} from "@mui/material";
import {
  registerErrorClear,
  registerFail,
  setRegisterModalState,
  setRegisterPending,
} from "../features/register.slice";
import { setVerificationModalState } from "../features/verification.slice";

function Register() {
  const [displayname, setDisplayname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [year, setYear] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const { error, isLoading, registerIsOpen } = useSelector(
    (state) => state.register
  );

  const { verificationIsOpen } = useSelector((state) => state.verification);

  // Removing error after 3s
  if (error !== "") {
    setTimeout(() => dispatch(registerErrorClear()), 3000);
  }
  if (error === "Internal Server Error") {
    dispatch(registerFail(""));
  }

  const handleOnClick = async (e) => {
    e.preventDefault();

    dispatch(setRegisterPending(true));
    try {
      await axios.post("/auth/register_err", {
        displayname,
        username,
        email,
        password,
        month,
        day,
        year,
      });

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
      dispatch(registerFail(error.response.data));
    }
  };

  return (
    <div
      className={
        registerIsOpen
          ? `w-screen h-screen absolute top-0 bg-white md:bg-black md:bg-opacity-50`
          : `hidden`
      }
    >
      <div className="md:w-[70%] md:h-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[35%] lg:h-[70%] md:rounded-lg md:inset-0 md:m-auto md:absolute md:bg-white md:max-w-[80vw] md:mx-auto">
        <div className="flex-items w-full py-3">
          <button
            className="p-1 rounded-full hover:bg-gray-300 transition-color ml-3"
            onClick={() => {
              dispatch(setRegisterModalState(false));
            }}
          >
            <CloseOutlinedIcon />
          </button>

          <img src={twitterLogo} alt="twitter_logo" className="h-6 mx-auto" />
        </div>
        <form className="max-w-[80%] mx-auto mt-5 md:h-max h-[80vh] grid place-content-center">
          <h1 className="text-4xl font-extrabold mb-10">Create your account</h1>
          {!verificationIsOpen && (
            <div className="flex flex-col space-y-2">
              <TextField
                id="outlined-basic-displayname"
                value={displayname}
                onChange={(e) => setDisplayname(e.target.value)}
                label="Displayname"
                variant="outlined"
              />
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="outlined-basic-username"
                label="Username"
                variant="outlined"
              />
              <TextField
                id="outlined-basic-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="outlined"
              />
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>
          )}
          <div className="mt-7">
            <h1 className="font-bold text-xl mb-1">Date of birth</h1>
            <p className="text-sm text-gray-600 mb-5">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>
            <div className="grid grid-cols-3 space-x-4">
              <div>
                <h1 className="font-bold text-xl">Month</h1>
                <Slider
                  size="small"
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  min={1}
                  max={12}
                />
              </div>
              <div>
                <h1 className="font-bold text-xl">Day</h1>
                <Slider
                  size="small"
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  min={1}
                  max={31}
                />
              </div>
              <div>
                <h1 className="font-bold text-xl">Year</h1>
                <Slider
                  size="small"
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  min={1950}
                  max={2022}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={
              !isLoading
                ? `auth-btn bg-black hover:bg-zinc-800 w-[70%] inset-x-0 mx-auto mt-7 text-white font-bold`
                : `auth-btn bg-black hover:bg-zinc-800 w-[70%] inset-x-0 mx-auto mt-7 text-white font-bold cursor-not-allowed`
            }
            onClick={(e) => {
              if (!isLoading) {
                handleOnClick(e);
              } else {
                e.preventDefault();
              }
            }}
          >
            {isLoading ? <Loader forPage={false} /> : <h1>Register</h1>}
          </button>
        </form>
      </div>
      {error && (
        <h1 className="absolute bottom-0 p-2 w-full text-white font-bold bg-blue-500 text-center lg:w-max lg:px-5 lg:bottom-5 lg:inset-x-0 lg:mx-auto lg:rounded-lg lg:ring-2 lg:ring-blue-600">
          {error}!
        </h1>
      )}

      {verificationIsOpen && <Verification />}
    </div>
  );
}

export default Register;
