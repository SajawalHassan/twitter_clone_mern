import React from "react";

function Loader({ forPage }) {
  return (
    <div
      className={
        forPage ? `w-screen h-screen grid place-content-center` : `block`
      }
    >
      <div
        style={{ borderTopColor: "blue" }}
        className="w-6 h-6 border-2 border-blue-300 animate-spin rounded-full"
      ></div>
    </div>
  );
}

export default Loader;
