import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFail,
  loginPending,
  loginSuccess,
  clearError,
} from "../features/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../actions/userAction";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "../axios/axios";
import Button from "../components/Button";
import AppleLogo from "../images/apple-logo.png";
import googleLogo from "../images/google-logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading } = useSelector((state) => state.login);

  const twitterLogoURL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAABhCAMAAADbaM4+AAAAY1BMVEUdofL///8AnfIAm/EAmfESn/L7/v/z+v7v+P74/P+l1fmw2vrP6PxouvVdtvXU6vyTzfgqpvPH5fs4qvPk8v3A4ft/xPeGx/eczPjb7/1NsfS23fp1wPab0fii0PhHrvQAlPFtqjD7AAAFGElEQVRogb2a6barKgyAEcR5Qhy2Q+t5/6e8Um2rAmqo3vzYq2sv8ZMASUiCrCvFbbrg+fcMy8I/eBJdxvTzits2IZhiTGyUBMX/wS0yTjBaCMUozpWPht5lXDdDBEmCSRJJj0YJd5bcowXZk5wTKmPFpEnlLh908oTYobXkxqkp1cmwmiqE8ObzYBG04/dxd8lNCfMMsTHWUsWUUTlBu54JreDAWnJjjF96h2OHXawgd270aBl9aQW3/pJbjN+FWxNwothQGy5F4+Gi8+95p83cQHw0juHY6hC7EvK0VtxpjeDgEIbF/XvgxPXY/P8EpuqC6neyCpu8B/oTN3oPxy1oV8cw7KxOP0+Kidt99iQemh3ORvKjrbwSUosxbl7zf+Gs5+d3mShTW9Wfp8tLy02Dno1eo3qvb7388PlkH0sKmS2rq4QRPIKoOMITt1opjPTuAXGSDKJmKuT1g3390ZqLMJf9iCz+AJnvh89ejkCh59fHZcfcBrSZPzJNSdpXMxgPh/4JaDPmF8+7FuleQXF1sMoVfL4UvRdw4uaqhzALd7kJmEvZxzi87aTqHZTwUo91wNsKt18NTlwnUR+JkdzpuD4HzhdXi9GzP3pojyLhodpku0od7WDr5eiZ2+wMIKxOFW4KyiUPBdfSKHr+VNo+pCjc5yAswpmKm+8fxjEKH7J0Heu2QD0rucdvoZjwOIi8j8r348iz3PTMW/AYE7bVo0sLz7cCYGilXN/TERod49GRzvgAPEdYw3Ug7xEuDXh8SajmWsXOdeMCIaWGO+7pO8F2KnGdYDJJJWyHwoQUEtdqSd2I8xGx28gUeTI3GYO8NssLp0ju4iLuy1zhwinBiCfxXViaWDL3OamXIti9AyJrdzRzy1tP0MQNFNwCagQMuJGC6wB9C1w22/ltN0ChvxF3cFTc5m5Fb7bVIq9yM7dTcyOT4B8g1FNzgVd3MLa1NNx7jxLe3vO+fjC41RltsxcL/xvfuMTDNgBfcJ3hPuP8sPRcy4XeeM6LlCRa5b299p413vhAiWv5sX0Hl8gX6W2eP6DXT5kqUttSfaGILydvbbOSO5rMmF57oqiioqOspzQPo9SUDqvKLq+5bjGdb6cIgLfbHZFslcwtGG+TOBk4um6Naa/AbvUcY0ovviZhZWJ5w4VllE9hldOV9tXlAd7W4Wu4V8cdRPIIau42JfyrMDVW5nqXOiWiy+rKdiO9MOAhCgup41rdZQeJDtpUsspOBhflGz7FwJNcK7xmxmSnWKCus1+Sb9itNmrq+178s64p3yv5afsKyuG3kIei3cKIvp/B6Qbyg7aJNlF/wB0lzTgVjSAGWPug2HfUv1FEQV0x+GyP6l5n+kYqOFZrp85zDc7UMfaQ69Zgx0hPYA+4TsfBk6VU43LPc/PdKouOu1/dO+aWrUHWEJ8s0+u4RTCYWErS7nZ7HXC9rkcm1mLcUWfbqSSukz4SRo3yshSfb4VA3kcxfpOHFccYmyWDKUnOtSPM833YBAlDaIumPHPnh9m+I5C4llebTnFBpTVgsta8vk38i8cTDXzxyW285r7u2qZTHgcm8N68b12yN7t7YtSbdAQu63QPXTuifq6YywVpKFc0RvXofHhBCepz07bLrd3wyp7hQzYdTwCrSsPORxV3FD8K4hdbDcdjxCUK3780mOrj56arE0ZEe6/IPIg/Y4RHbBvxOCsb2FkFcF/i+EXUhc+/uq7q7O8ZdHnjGvV2KuQ/j545u2p+X7oAAAAASUVORK5CYII=";

  useEffect(() => {
    sessionStorage.getItem("accessToken") && navigate("/");
  }, [navigate]);

  const featureNotAdded = () => {
    alert("This feature has not been added yet");
  };

  const handleOnClick = async (e) => {
    e.preventDefault();

    dispatch(loginPending());
    try {
      const { data, status } = await axios.post("/auth/login", {
        email,
        password,
      });

      if (status === 200) {
        sessionStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      dispatch(loginSuccess());
      dispatch(getUserProfile());
      navigate("/");
    } catch (error) {
      dispatch(loginFail(error.response.data));
    }
  };

  if (error) {
    setTimeout(() => dispatch(clearError()), 3000);
  }

  return (
    <div>
      <div className="p-4">
        <div className="flex-items">
          <Link to="/register" className="p-1 hover:bg-zinc-400 rounded-full">
            <CloseOutlinedIcon />
          </Link>

          <img
            src={twitterLogoURL}
            alt="twitter-logo"
            className="h-6 mx-auto"
          />
        </div>
        <div className="h-[88vh] flex-items justify-center flex-col space-y-5">
          <h1 className="text-2xl font-bold">Sign in to Twitter</h1>

          <div className="w-[60vw] space-y-2" onClick={() => featureNotAdded()}>
            <Button text="Sign in with Google" img={googleLogo} />
            <Button text="Sign in with Apple" img={AppleLogo} />
          </div>

          <div className="flex items-center">
            <div className="w-[30vw] ring-1 ring-gray-300"></div>
            <div className="px-2">or</div>
            <div className="w-[30vw] ring-1 ring-gray-300"></div>
          </div>
          <form className="flex-column space-y-2">
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
                      onClick={() => setShowPassword(!password)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <button
              type="submit"
              onClick={(e) => handleOnClick(e)}
              className="w-full h-9 bg-black rounded-full hover:bg-zinc-800 transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex-items justify-center">
                  <div
                    style={{ borderTopColor: "lightblue" }}
                    className="w-6 h-6 border-[3px] border-blue-600 rounded-full animate-spin mx-auto"
                  />
                </div>
              ) : (
                <h1 className="text-white font-bold">Login</h1>
              )}
            </button>
          </form>
          <button
            type="button"
            className="w-[55vw] h-9 bg-transparent ring-1 ring-gray-300 rounded-full hover:bg-gray-200 transition-all duration-300"
          >
            Forgot password?
          </button>
        </div>
      </div>
      <div
        className={
          error
            ? `bg-blue-500 w-full h-10 absolute bottom-0 flex-items justify-center selection:bg-blue-700`
            : `hidden`
        }
      >
        <div className="font-bold text-white">{error}!</div>
      </div>
    </div>
  );
}

export default Login;
