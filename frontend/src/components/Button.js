import React from "react";

function AuthButtons({ text, img, textColor }) {
  return (
    <div className="login-btn space-x-1">
      <img src={img} alt="" className="h-5" />
      <h1 className={`font-bold text-sm text-${textColor}`}>{text}</h1>
    </div>
  );
}

export default AuthButtons;
