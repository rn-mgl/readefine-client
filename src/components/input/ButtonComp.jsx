import React from "react";

const ButtonComp = (props) => {
  return (
    <button
      type={props.type}
      className={`text-center rounded-md font-poppins text-sm font-extrabold ${props.fontColor} ${props.bgColor} ${props.css} p-2
                m-l:text-base
                t:text-lg
                l-s:text-xl l-s:p-3`}
    >
      {props.label}
    </button>
  );
};

export default ButtonComp;
