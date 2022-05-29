import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slider,
  TextField,
} from "@mui/material";
import {
  clearError,
  registerFail,
  registerPending,
  registerSuccess,
} from "../features/registerSlice";

import axios from "../axios/axios";
import Button from "../components/Button";
import AppleLogo from "../images/apple-logo.png";
import googleLogo from "../images/google-logo.png";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

function Register() {
  const [displayname, setDisplayname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [year, setYear] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const twitterLogoURL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAABhCAMAAADbaM4+AAAAY1BMVEUdofL///8AnfIAm/EAmfESn/L7/v/z+v7v+P74/P+l1fmw2vrP6PxouvVdtvXU6vyTzfgqpvPH5fs4qvPk8v3A4ft/xPeGx/eczPjb7/1NsfS23fp1wPab0fii0PhHrvQAlPFtqjD7AAAFGElEQVRogb2a6barKgyAEcR5Qhy2Q+t5/6e8Um2rAmqo3vzYq2sv8ZMASUiCrCvFbbrg+fcMy8I/eBJdxvTzits2IZhiTGyUBMX/wS0yTjBaCMUozpWPht5lXDdDBEmCSRJJj0YJd5bcowXZk5wTKmPFpEnlLh908oTYobXkxqkp1cmwmiqE8ObzYBG04/dxd8lNCfMMsTHWUsWUUTlBu54JreDAWnJjjF96h2OHXawgd270aBl9aQW3/pJbjN+FWxNwothQGy5F4+Gi8+95p83cQHw0juHY6hC7EvK0VtxpjeDgEIbF/XvgxPXY/P8EpuqC6neyCpu8B/oTN3oPxy1oV8cw7KxOP0+Kidt99iQemh3ORvKjrbwSUosxbl7zf+Gs5+d3mShTW9Wfp8tLy02Dno1eo3qvb7388PlkH0sKmS2rq4QRPIKoOMITt1opjPTuAXGSDKJmKuT1g3390ZqLMJf9iCz+AJnvh89ejkCh59fHZcfcBrSZPzJNSdpXMxgPh/4JaDPmF8+7FuleQXF1sMoVfL4UvRdw4uaqhzALd7kJmEvZxzi87aTqHZTwUo91wNsKt18NTlwnUR+JkdzpuD4HzhdXi9GzP3pojyLhodpku0od7WDr5eiZ2+wMIKxOFW4KyiUPBdfSKHr+VNo+pCjc5yAswpmKm+8fxjEKH7J0Heu2QD0rucdvoZjwOIi8j8r348iz3PTMW/AYE7bVo0sLz7cCYGilXN/TERod49GRzvgAPEdYw3Ug7xEuDXh8SajmWsXOdeMCIaWGO+7pO8F2KnGdYDJJJWyHwoQUEtdqSd2I8xGx28gUeTI3GYO8NssLp0ju4iLuy1zhwinBiCfxXViaWDL3OamXIti9AyJrdzRzy1tP0MQNFNwCagQMuJGC6wB9C1w22/ltN0ChvxF3cFTc5m5Fb7bVIq9yM7dTcyOT4B8g1FNzgVd3MLa1NNx7jxLe3vO+fjC41RltsxcL/xvfuMTDNgBfcJ3hPuP8sPRcy4XeeM6LlCRa5b299p413vhAiWv5sX0Hl8gX6W2eP6DXT5kqUttSfaGILydvbbOSO5rMmF57oqiioqOspzQPo9SUDqvKLq+5bjGdb6cIgLfbHZFslcwtGG+TOBk4um6Naa/AbvUcY0ovviZhZWJ5w4VllE9hldOV9tXlAd7W4Wu4V8cdRPIIau42JfyrMDVW5nqXOiWiy+rKdiO9MOAhCgup41rdZQeJDtpUsspOBhflGz7FwJNcK7xmxmSnWKCus1+Sb9itNmrq+178s64p3yv5afsKyuG3kIei3cKIvp/B6Qbyg7aJNlF/wB0lzTgVjSAGWPug2HfUv1FEQV0x+GyP6l5n+kYqOFZrp85zDc7UMfaQ69Zgx0hPYA+4TsfBk6VU43LPc/PdKouOu1/dO+aWrUHWEJ8s0+u4RTCYWErS7nZ7HXC9rkcm1mLcUWfbqSSukz4SRo3yshSfb4VA3kcxfpOHFccYmyWDKUnOtSPM833YBAlDaIumPHPnh9m+I5C4llebTnFBpTVgsta8vk38i8cTDXzxyW285r7u2qZTHgcm8N68b12yN7t7YtSbdAQu63QPXTuifq6YywVpKFc0RvXofHhBCepz07bLrd3wyp7hQzYdTwCrSsPORxV3FD8K4hdbDcdjxCUK3780mOrj56arE0ZEe6/IPIg/Y4RHbBvxOCsb2FkFcF/i+EXUhc+/uq7q7O8ZdHnjGvV2KuQ/j545u2p+X7oAAAAASUVORK5CYII=";

  const { isAuth, isLoading, error } = useSelector((state) => state.register);

  console.log(isLoading);
  const featureNotAdded = () => {
    alert("This feature has not been added yet");
  };

  if (error !== "") {
    setTimeout(() => dispatch(clearError()), 3000);
  }

  useEffect(() => {
    (isAuth || sessionStorage.getItem("accessToken")) && navigate("/");
  }, [isAuth, navigate]);

  const handleOnClick = async (e) => {
    e.preventDefault();

    dispatch(registerPending());
    try {
      // eslint-disable-next-line
      const { data, status } = await axios.post("/auth/register", {
        displayname,
        username,
        email,
        password,
        month,
        day,
        year,
      });

      dispatch(registerSuccess());
      navigate("/login");
    } catch (error) {
      dispatch(registerFail(error.response.data));
    }
  };

  return (
    <div className="p-7 max-w-[75vw]">
      <img src={twitterLogoURL} alt="twitter logo" className="h-10" />

      <div className="mt-16 mb-5 space-y-10">
        <h1 className="font-bold text-5xl">Happening now</h1>
        <h3 className="font-bold text-2xl">Join Twitter today.</h3>
      </div>

      <div className="space-y-2" onClick={() => featureNotAdded()}>
        <Button text="Sign up with Google" img={googleLogo} />
        <Button text="Sign up with Apple" img={AppleLogo} />
      </div>

      <div className="flex items-center my-5">
        <div className="w-[50%] ring-1 ring-gray-300"></div>
        <div className="px-2">or</div>
        <div className="w-[50%] ring-1 ring-gray-300"></div>
      </div>

      <form className="flex flex-col space-y-2">
        <TextField
          id="outlined-basic"
          label="Displayname"
          variant="outlined"
          value={displayname}
          onChange={(e) => setDisplayname(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <div className="grid grid-cols-3 space-x-5">
          <div>
            <p className="font-bold text-lg">Month</p>
            <Slider
              size="small"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              aria-label="Small"
              valueLabelDisplay="auto"
              min={1}
              max={12}
            />
          </div>
          <div>
            <p className="font-bold text-lg">Day</p>
            <Slider
              size="small"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              aria-label="Small"
              valueLabelDisplay="auto"
              min={1}
              max={31}
            />
          </div>
          <div>
            <p className="font-bold text-lg">Year</p>
            <Slider
              size="small"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              aria-label="Small"
              valueLabelDisplay="auto"
              min={1950}
              max={2022}
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={(e) => handleOnClick(e)}
          className="py-3 px-5 bg-black hover:bg-zinc-800 transition-all duration-300 rounded-full text-white"
        >
          {isLoading ? (
            <div className="flex-items justify-center">
              <div
                style={{ borderTopColor: "lightblue" }}
                className="w-6 h-6 border-[3px] border-blue-600 rounded-full animate-spin mx-auto"
              />
            </div>
          ) : (
            <h1>Register</h1>
          )}
        </button>
        <p className="text-xs">
          By signing up, you agree to the{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Privacy Policy
          </span>
          , including{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Cookie Use.
          </span>
        </p>
      </form>

      <div className="mt-10">
        <h1 className="text-xl font-bold mb-4">Already have an account?</h1>
        <Link to="/login">
          <Button text="Sign in" textColor="blue-500" />
        </Link>
      </div>

      <h1
        className={
          error
            ? `absolute bottom-5 h-14 px-4 rounded-md bg-blue-500 flex-items justify-center right-[10%] left-[10%] font-bold text-white`
            : `hidden`
        }
      >
        {error}!
      </h1>
    </div>
  );
}

export default Register;
