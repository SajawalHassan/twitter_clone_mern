import React, { useEffect, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import protectedAxios from "../utils/protectedAxios";
import Loader from "../components/Loader/Loader.comp";

function EditProfile({ editProfile, setEditProfile, userInfo, setUserInfo }) {
  const [bannerImg, setBannerImg] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [usernameField, setUsernameField] = useState("");
  const [displaynameField, setDisplaynameField] = useState("");
  const [bioField, setBioField] = useState("");
  const [locationField, setLocationField] = useState("");
  const [websiteField, setWebsiteField] = useState("");
  const [error, setError] = useState("");
  const [monthField, setMonthField] = useState("January");
  const [dayField, setDayField] = useState(1);
  const [yearField, setYearField] = useState(1902);
  const [isLoading, setIsLoading] = useState(false);

  const bannerRef = useRef(null);
  const profileRef = useRef(null);
  const { _id } = userInfo;

  useEffect(() => {
    const {
      profilePic,
      username,
      displayname,
      bio,
      location,
      month,
      year,
      day,
      website,
      banner,
    } = userInfo;
    setUsernameField(username);
    setDisplaynameField(displayname);
    setBioField(bio);
    setLocationField(location);
    setMonthField(month);
    setDayField(day);
    setYearField(year);
    setProfilePic(profilePic);
    setWebsiteField(website);
    setBannerImg(banner);
  }, [userInfo]);

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setBannerImg(reader.result);
      };
      reader.onerror = function (error) {
        console.log(error);
      };
    }
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setProfilePic(reader.result);
      };
      reader.onerror = function (error) {
        console.log(error);
      };
    }
  };

  const handleOnClick = async (e) => {
    setIsLoading(true);
    const { error } = await protectedAxios({
      url: `users/edit/${_id}`,
      body: {
        displayname: displaynameField,
        username: usernameField,
        bio: bioField,
        location: locationField,
        website: websiteField,
        month: monthField,
        day: dayField,
        year: yearField,
        profilePic: profilePic,
        banner: bannerImg,
      },
      method: "put",
    });

    if (error) {
      setIsLoading(false);
      return setError(error);
    }

    const { data } = await protectedAxios({
      url: `users/profile/${_id}`,
      method: "get",
    });

    setUserInfo(data);

    setEditProfile(false);
    setIsLoading(false);
  };

  if (error) {
    setTimeout(() => setError(""), 3000);
  }

  return (
    <div
      className={
        editProfile
          ? `absolute inset-0 m-auto w-screen h-screen bg-white z-50`
          : `hidden`
      }
    >
      <div className="flex-items justify-between px-3 py-2">
        <div className="flex-items space-x-4">
          <div className="p-1 hover:bg-gray-200 rounded-full transition-color cursor-pointer">
            <ArrowBackIcon onClick={() => setEditProfile(false)} />
          </div>
          <h1 className="font-bold text-lg">Edit profile</h1>
        </div>
        <div>
          <button
            className="py-1 bg-black rounded-full text-white font-bold hover:bg-zinc-800 transition-color sticky top-0 w-[4rem] flex-center"
            onClick={() => handleOnClick()}
          >
            {isLoading ? <Loader /> : <h1>Save</h1>}
          </button>
        </div>
      </div>
      <div>
        <div className="relative">
          <div className="w-screen h-[10rem] relative">
            {bannerImg ? (
              <div className="w-full h-full relative">
                <img src={bannerImg} alt="" className="h-full w-full" />
                <div className="banner-edit-container bg-black bg-opacity-30">
                  <CameraAltOutlinedIcon
                    className="banner-btn-edit"
                    style={{ fontSize: "2.5rem", color: "white" }}
                    onClick={() => bannerRef.current.click()}
                  />
                  <CloseOutlined
                    className="banner-btn-edit"
                    style={{ fontSize: "2.5rem", color: "white" }}
                    onClick={() => setBannerImg("")}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative">
                <div className="bg-[#CFD9DE] w-full h-full" />
                <div className="banner-edit-container">
                  <CameraAltOutlinedIcon
                    className="banner-btn-edit"
                    style={{ fontSize: "2.5rem", color: "white" }}
                    onClick={() => bannerRef.current.click()}
                  />
                </div>
              </div>
            )}
          </div>
          {profilePic ? (
            <div className="relative">
              <div className="w-[7rem] h-[7rem] rounded-full absolute -bottom-10 left-5 border-4 border-white">
                <img
                  src={profilePic}
                  alt=""
                  className="h-full w-full rounded-full"
                />
                <CameraAltOutlinedIcon
                  className="absolute inset-0 rounded-full m-auto banner-btn-edit hover:bg-gray-800"
                  style={{ fontSize: "2.5rem", color: "white" }}
                  onClick={() => profileRef.current.click()}
                />
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="bg-gray-500 w-[7rem] h-[7rem] rounded-full absolute -bottom-10 left-5 border-4 border-white">
                <CameraAltOutlinedIcon
                  className="absolute inset-0 rounded-full m-auto banner-btn-edit hover:bg-gray-800"
                  style={{ fontSize: "2.5rem", color: "white" }}
                  onClick={() => profileRef.current.click()}
                />
              </div>
            </div>
          )}
        </div>
        <div className="mt-[5rem] pl-[1.5rem] w-[90%] ">
          <div className="space-y-5">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              value={usernameField}
              onChange={(e) => setUsernameField(e.target.value)}
              className="w-full"
            />
            <TextField
              id="outlined-basic"
              label="Displayname"
              variant="outlined"
              value={displaynameField}
              onChange={(e) => setDisplaynameField(e.target.value)}
              className="w-full"
            />
            <TextField
              id="outlined-basic"
              label="Bio"
              variant="outlined"
              value={bioField}
              onChange={(e) => setBioField(e.target.value)}
              multiline={true}
              rows={3}
              className="w-full"
            />
            <TextField
              id="outlined-basic"
              label="Location"
              variant="outlined"
              value={locationField}
              onChange={(e) => setLocationField(e.target.value)}
              className="w-full"
            />
            <TextField
              id="outlined-basic"
              label="Website"
              variant="outlined"
              value={websiteField}
              onChange={(e) => setWebsiteField(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mt-7">
            <h1 className="font-bold text-xl mb-1">Date of birth</h1>
            <div className="space-y-4 mb-5">
              <p className="text-sm text-gray-600">
                This should be the date of birth of the person using the
                account. Even if you're making an account for your business,
                event, or cat.
              </p>
              <p className="text-sm text-gray-600">
                Twitter uses your age to customize your experience, including
                ads, as explained in our{" "}
                <span className="text-blue-500 cursor-pointer hover:underline">
                  Privacy Policy
                </span>
                .
              </p>
            </div>
            <div className="grid grid-cols-3 space-x-4">
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Month</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={monthField}
                    label="Age"
                    onChange={(e) => setMonthField(e.target.value)}
                  >
                    <MenuItem value="January">January</MenuItem>
                    <MenuItem value="Febuary">Febuary</MenuItem>
                    <MenuItem value="March">March</MenuItem>
                    <MenuItem value="April">April</MenuItem>
                    <MenuItem value="May">May</MenuItem>
                    <MenuItem value="June">June</MenuItem>
                    <MenuItem value="July">July</MenuItem>
                    <MenuItem value="August">August</MenuItem>
                    <MenuItem value="Sepember">Sepember</MenuItem>
                    <MenuItem value="October">October</MenuItem>
                    <MenuItem value="November">November</MenuItem>
                    <MenuItem value="December">December</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Day</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={dayField}
                    label="Age"
                    onChange={(e) => setDayField(e.target.value)}
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
                value={yearField}
                onChange={(e) => setYearField(e.target.value)}
                label="Year"
                variant="outlined"
              />
            </div>
          </div>
        </div>
      </div>

      <input
        type="file"
        className="hidden"
        ref={bannerRef}
        onChange={(e) => handleBannerChange(e)}
      />
      <input
        type="file"
        className="hidden"
        ref={profileRef}
        onChange={(e) => handleProfileChange(e)}
      />
      {error && <h1 className="error err-animation px-[5px]">{error}!</h1>}
    </div>
  );
}

export default EditProfile;
