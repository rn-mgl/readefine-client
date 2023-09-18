import React from "react";

const ActionLabel = (props) => {
  return (
    <p
      className="group-hover:inline-block hidden text-white absolute left-2/4 -translate-x-2/4 
                -top-8 p-2 bg-black text-xs rounded-md whitespace-nowrap z-50"
    >
      {props.label}
    </p>
  );
};

export default ActionLabel;
