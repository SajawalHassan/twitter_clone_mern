import React, { useState } from "react";
import twitterLogo from "../images/twitter_logo.png";
import googleLogo from "../images/google_logo.png";
import appleLogo from "../images/apple_logo.png";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "../api/axios";

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
import { useNavigate } from "react-router-dom";
import { setAccessToVerificationPage } from "../features/verification.slice";
import Loader from "../components/Loader.comp";

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
  const navigate = useNavigate();

  const { error, isLoading } = useSelector((state) => state.register);

  // Removing error after 3s
  if (error !== "") {
    setTimeout(() => dispatch(registerErrorClear()), 3000);
  }

  const handleOnClick = async (e) => {
    e.preventDefault();

    dispatch(registerPending());
    try {
      await axios.post("/auth/register_err", {
        displayname: displayname,
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
        setAccessToVerificationPage({
          access: true,
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
      navigate("/verification");
    } catch (error) {
      dispatch(registerFail(error.response.data));
    }
  };

  return (
    <div>
      <div className="m-10">
        <img src={twitterLogo} alt="twitter_logo" className="h-9" />
        <h1 className="mt-10 font-extrabold text-5xl">Happening now</h1>
      </div>
      <form className="mt-5 mx-9 space-y-2 w-[70%]">
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
        <TextField
          sx={{ width: "100%" }}
          id="outlined-basic-displayname"
          value={displayname}
          onChange={(e) => setDisplayname(e.target.value)}
          label="Displayname"
          variant="outlined"
        />
        <TextField
          sx={{ width: "100%" }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="outlined-basic-username"
          label="Username"
          variant="outlined"
        />
        <TextField
          sx={{ width: "100%" }}
          id="outlined-basic-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="outlined"
        />
        <FormControl sx={{ width: "100%" }} variant="outlined">
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
          className="auth-btn bg-black hover:bg-zinc-800 text-white font-bold"
          onClick={(e) => handleOnClick(e)}
        >
          {isLoading ? <Loader forPage={false} /> : <h1>Register</h1>}
        </button>
      </form>
      <div className="w-[70%] mx-9 mt-[5rem]">
        <h1 className="font-bold text-2xl">Already have an account?</h1>
        <button className="auth-btn text-blue-500 mt-3 font-bold">
          Sign in
        </button>
      </div>
      {error && (
        <h1 className="absolute bottom-0 p-2 w-full text-white font-bold bg-blue-500 text-center">
          {error}!
        </h1>
      )}
    </div>
  );
}

export default Register;
