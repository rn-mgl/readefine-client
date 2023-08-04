import React from "react";

const ButtonComp = (props) => {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      className={`text-center rounded-full font-poppins text-sm font-bold transition-all
                ${props.fontColor} ${props.bgColor} ${props.css} disabled:saturate-50 p-2 px-4`}
    >
      {props.label}
    </button>
  );
};

export default ButtonComp;
