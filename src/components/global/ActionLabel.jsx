import React from "react";

const ActionLabel = (props) => {
  return (
    <p className="group-hover:flex group-hover:delay-500 delay-0 hidden text-white absolute left-2/4 -translate-x-2/4 -top-10 p-2 bg-black text-xs rounded-md whitespace-nowrap z-50">
      {props.label}
    </p>
  );
};

export default ActionLabel;
