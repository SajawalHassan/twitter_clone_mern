import React, { useEffect, useState } from "react";
import twitterLogo from "../images/twitter_logo.png";
import googleLogo from "../images/google_logo.png";
import appleLogo from "../images/apple_logo.png";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "../api/axios";
import Loader from "../components/Loader.comp";
import twitterLogoWhite from "../images/twitter_logo_white.png";

import { featureNotAdded } from "../components/utilFunctions.comp";
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
  registerPending,
} from "../features/register.slice";
import {
  setVerificationModalState,
  setVerificationPending,
} from "../features/verification.slice";
import Verification from "../modals/Verification.modal";

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

  const { error, isLoading } = useSelector((state) => state.register);
  const { isOpen } = useSelector((state) => state.verification);

  // Removing error after 3s
  if (error !== "") {
    setTimeout(() => dispatch(registerErrorClear()), 3000);
  }
  if (error === "Internal Server Error") {
    dispatch(registerFail(""));
  }

  useEffect(() => {
    if (isLoading) dispatch(setVerificationPending(false));
    // eslint-disable-next-line
  }, []);

  const handleOnClick = async (e) => {
    e.preventDefault();

    dispatch(registerPending());
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
      dispatch(registerFail(error.response.data));
    }
  };

  return (
    <div>
      <div className={!isOpen ? `lg:flex-items` : `hidden lg:flex-items`}>
        <div className="hidden lg:block w-[50%] h-screen relative">
          <img
            src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
            alt="twitter_logo_white_bg"
            className="h-screen"
            draggable="false"
          />
          <img
            src={twitterLogoWhite}
            alt="twitter_logo_white"
            className="absolute inset-0 m-auto"
            draggable="false"
          />
        </div>
        <div className="sm:mx-auto md:max-w-[70%] lg:mx-6 sm:max-w-[90%]">
          <div className="m-10">
            <img src={twitterLogo} alt="twitter_logo" className="h-9" />
            <h1 className="mt-10 font-extrabold text-5xl sm:text-6xl lg:text-5xl xl:text-6xl">
              Happening now
            </h1>
          </div>
          <div className="mt-5 mx-9 space-y-2 max-w-[70%] flex flex-col">
            <h3 className="font-bold text-3xl mb-4">Join Twitter today.</h3>
            <button
              type="button"
              className="auth-btn"
              onClick={() => featureNotAdded()}
            >
              <img src={googleLogo} alt="google_logo" className="h-6" />
              <h1 className="font-bold">Sign in with Google</h1>
            </button>
            <button
              type="button"
              className="auth-btn"
              onClick={() => featureNotAdded()}
            >
              <img src={appleLogo} alt="google_logo" className="h-6" />
              <h1 className="font-bold">Sign in with Apple</h1>
            </button>
            <div className="flex-items">
              <div className="or-seperator"></div>
              <div className="px-2">or</div>
              <div className="or-seperator"></div>
            </div>
            <div>
              <form>
                {!isOpen && (
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </div>
                )}
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

                <button
                  type="submit"
                  className={
                    !isLoading
                      ? `auth-btn bg-black hover:bg-zinc-800 text-white font-bold`
                      : `auth-btn bg-black hover:bg-zinc-800 text-white font-bold cursor-not-allowed`
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
              <div className="mt-10">
                <h1 className="font-bold text-2xl">Already have an account?</h1>
                <button className="auth-btn text-blue-500 mt-3" to="/login">
                  Sign in
                </button>
              </div>
              {error && (
                <h1 className="absolute bottom-0 p-2 w-full text-white font-bold bg-blue-500 text-center lg:w-max lg:px-5 lg:bottom-5 lg:inset-x-0 lg:mx-auto lg:rounded-lg lg:ring-2 lg:ring-blue-600">
                  {error}!
                </h1>
              )}

              {isOpen && <Verification />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
