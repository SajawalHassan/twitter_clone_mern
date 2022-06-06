import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "../api/axios";
import Loader from "../components/Loader/Loader.comp";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import twitterLogo from "../images/twitter_logo.png";
import Verification from "../modals/Verification.modal";
import googleLogo from "../images/google_logo.png";
import appleLogo from "../images/apple_logo.png";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHotkeys } from "react-hotkeys-hook";
import { featureNotAdded } from "../components/utils/utilFunctions.comp";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import {
  loginErrorClear,
  loginFail,
  loginSuccess,
  setLoginModalState,
  setloginPending,
} from "../features/login.slice";
import { setRegisterModalState } from "../features/register.slice";
import { setUser } from "../features/user.slice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading, loginIsOpen } = useSelector((state) => state.login);

  useHotkeys("esc", () => dispatch(setLoginModalState(false)));
  const { verificationIsOpen } = useSelector((state) => state.verification);

  // Removing error after 3s
  if (error !== "") {
    setTimeout(() => dispatch(loginErrorClear()), 3000);
  }
  if (error === "Internal Server Error") {
    dispatch(loginFail(""));
  }

  const handleOnClick = async (e) => {
    e.preventDefault();

    dispatch(setloginPending(true));
    try {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });

      sessionStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      dispatch(loginSuccess());
      dispatch(setUser(data));
      navigate("/home");
    } catch (error) {
      dispatch(loginFail(error.response.data));
    }
  };

  return (
    <div
      className={
        loginIsOpen
          ? `w-screen h-screen absolute top-0 bg-white md:bg-black md:bg-opacity-50 modal-animation`
          : `hidden`
      }
    >
      <div className="w-full md:w-[70%] md:h-max pb-[3rem] lg:w-[60%] xl:w-[50%] 2xl:w-[35%] md:rounded-lg md:inset-0 md:m-auto md:absolute md:bg-white md:mx-auto">
        <div className="flex-items w-full py-3">
          <button
            className="p-1 rounded-full hover:bg-gray-300 transition-color ml-3"
            onClick={() => dispatch(setLoginModalState(false))}
          >
            <CloseOutlinedIcon />
          </button>

          <img src={twitterLogo} alt="twitter_logo" className="h-6 mx-auto" />
        </div>
        <form className="flex flex-col justify-center max-w-[60%] lg:max-w-[50%] xl:max-w-[60%] mx-auto mt-5 md:h-max h-[80vh]">
          <h1 className="text-4xl font-extrabold mb-5">Sign in to Twitter</h1>
          <button
            type="button"
            className="auth-btn mb-3"
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
          <div className="flex-items my-5">
            <div className="or-seperator"></div>
            <div className="px-2">or</div>
            <div className="or-seperator"></div>
          </div>
          {!verificationIsOpen && (
            <div className="flex flex-col space-y-2">
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

          <button
            type="submit"
            className={
              !isLoading
                ? `auth-btn bg-black hover:bg-zinc-800 inset-x-0 mx-auto mt-10 text-white font-bold`
                : `auth-btn bg-black hover:bg-zinc-800 inset-x-0 mx-auto mt-10 text-white font-bold cursor-not-allowed`
            }
            onClick={(e) => handleOnClick(e)}
          >
            {isLoading ? <Loader forPage={false} /> : <h1>Login</h1>}
          </button>
          <button type="submit" className="auth-btn inset-x-0 mx-auto mt-5">
            <h1>Forgot password?</h1>
          </button>

          <p className="mt-10 text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => {
                dispatch(setLoginModalState(false));
                dispatch(setRegisterModalState(true));
              }}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
      {error && <h1 className="error err-animation">{error}!</h1>}

      {verificationIsOpen && <Verification />}
    </div>
  );
}

export default Login;
