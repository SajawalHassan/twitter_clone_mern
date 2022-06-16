import React from "react";

function Loader({ forPage }) {
  return (
    <div
      className={
        forPage
          ? `absolute inset-0 m-auto bg-white grid place-content-center z-50`
          : `block`
      }
    >
      <div
        style={{ borderTopColor: "blue" }}
        className={
          forPage
            ? `w-8 h-8 border-2 border-blue-300 animate-spin rounded-full`
            : `w-6 h-6 border-2 border-blue-300 animate-spin rounded-full`
        }
      ></div>
    </div>
  );
}

export default Loader;
