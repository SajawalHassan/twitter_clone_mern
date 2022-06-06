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
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import {
  registerErrorClear,
  registerFail,
  setRegisterModalState,
  setRegisterPending,
} from "../features/register.slice";
import { setVerificationModalState } from "../features/verification.slice";
import { useHotkeys } from "react-hotkeys-hook";

function Register() {
  const [displayname, setDisplayname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [year, setYear] = useState();
  const [showPassword, setShowPassword] = useState(false);

  useHotkeys("esc", () => dispatch(setRegisterModalState(false)));
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
      dispatch(setRegisterModalState(false));
    } catch (error) {
      dispatch(registerFail(error.response.data));
    }
  };

  return (
    <div
      className={
        registerIsOpen
          ? `w-screen h-screen absolute top-0 bg-white md:bg-black md:bg-opacity-50 modal-animation`
          : `hidden`
      }
    >
      <div className="md:w-[70%] md:h-max pb-[2rem] lg:w-[60%] xl:w-[50%] 2xl:w-[35%] md:rounded-lg md:inset-0 md:m-auto md:absolute md:bg-white md:max-w-[80vw] md:mx-auto">
        <div className="flex-items w-full py-5">
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
        <form className="max-w-[80%] mx-auto md:h-max h-[80vh] grid place-content-center">
          <h1 className="text-4xl font-extrabold mb-10">Create your account</h1>
          {!verificationIsOpen && (
            <div>
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
              <div className="mt-7">
                <h1 className="font-bold text-xl mb-1">Date of birth</h1>
                <p className="text-sm text-gray-600 mb-5">
                  This will not be shown publicly. Confirm your own age, even if
                  this account is for a business, a pet, or something else.
                </p>
                <div className="grid grid-cols-3 space-x-4">
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Month
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={month}
                        label="Age"
                        onChange={(e) => setMonth(e.target.value)}
                      >
                        <MenuItem value={1}>January</MenuItem>
                        <MenuItem value={2}>Febuary</MenuItem>
                        <MenuItem value={3}>March</MenuItem>
                        <MenuItem value={4}>April</MenuItem>
                        <MenuItem value={5}>May</MenuItem>
                        <MenuItem value={6}>June</MenuItem>
                        <MenuItem value={7}>July</MenuItem>
                        <MenuItem value={8}>August</MenuItem>
                        <MenuItem value={9}>Sepember</MenuItem>
                        <MenuItem value={10}>October</MenuItem>
                        <MenuItem value={11}>November</MenuItem>
                        <MenuItem value={12}>December</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Day</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={day}
                        label="Age"
                        onChange={(e) => setDay(e.target.value)}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={13}>13</MenuItem>
                        <MenuItem value={14}>14</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={16}>16</MenuItem>
                        <MenuItem value={17}>17</MenuItem>
                        <MenuItem value={18}>18</MenuItem>
                        <MenuItem value={19}>19</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={21}>21</MenuItem>
                        <MenuItem value={22}>22</MenuItem>
                        <MenuItem value={23}>23</MenuItem>
                        <MenuItem value={24}>24</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={26}>26</MenuItem>
                        <MenuItem value={27}>27</MenuItem>
                        <MenuItem value={28}>28</MenuItem>
                        <MenuItem value={29}>29</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={31}>31</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <TextField
                    id="outlined-basic-year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    label="Year"
                    variant="outlined"
                  />
                </div>
              </div>
            </div>
          )}

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
      {error && <h1 className="error err-animation">{error}!</h1>}

      {verificationIsOpen && <Verification />}
    </div>
  );
}

export default Register;
