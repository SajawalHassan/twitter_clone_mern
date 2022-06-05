import React from "react";
import twitterLogo from "../images/twitter_logo.png";
import googleLogo from "../images/google_logo.png";
import appleLogo from "../images/apple_logo.png";
import twitterLogoWhite from "../images/twitter_logo_white.png";
import Register from "../modals/Register.modal";

import { featureNotAdded } from "../components/utilFunctions.comp";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterModalState } from "../features/register.slice";

function Auth() {
  const dispatch = useDispatch();

  const { verificationIsOpen } = useSelector((state) => state.verification);
  const { registerIsOpen } = useSelector((state) => state.register);

  return (
    <div>
      <div
        className={
          !verificationIsOpen
            ? `md:flex-items w-screen`
            : `hidden md:flex-items`
        }
      >
        <div className="hidden md:block w-[50%] h-screen relative">
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
        <div className="md:max-w-[70%] lg:mx-6 sm:max-w-[90%] grid place-content-center h-[85vh]">
          <div className="m-10">
            <img src={twitterLogo} alt="twitter_logo" className="h-9" />
            <h1 className="mt-10 font-extrabold text-5xl sm:text-6xl lg:text-5xl xl:text-6xl">
              Happening now
            </h1>
          </div>
          <div className="mt-5 mx-9 lg:max-w-[60%] max-w-[70%] flex flex-col">
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
            <button
              onClick={() => dispatch(setRegisterModalState(true))}
              className="auth-btn bg-blue-500 hover:bg-blue-600 text-white"
            >
              Sign up with phone or email
            </button>
            <div className="mt-10">
              <h1 className="font-bold text-2xl">Already have an account?</h1>
              <button className="auth-btn text-blue-500 mt-3" to="/login">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
      {registerIsOpen && <Register />}
    </div>
  );
}

export default Auth;
