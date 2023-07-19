import React from "react";

const ButtonComp = (props) => {
  return (
    <button
      type={props.type}
      className={`text-center rounded-full font-poppins text-sm font-extrabold ${props.fontColor} ${props.bgColor} ${props.css} p-2 px-4`}
    >
      {props.label}
    </button>
  );
};

export default ButtonComp;
