import React from "react";

const EditInput = (props) => {
  return (
    <div className="w-full cstm-flex-col gap-2 relative">
      <p className="text-sm text-prmColor font-bold mr-auto">{props.label}</p>
      <div className="absolute right-0 bottom-0 text-lg transition-all rounded-md bg-accntColor text-prmColor p-2">
        {props.icon}
      </div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange(e.target)}
        className="rounded-md px-2
           bg-accntColor p-2 w-full text-sm font-normal
            placeholder:text-prmColor placeholder:text-opacity-50
            focus:outline-none focus:border-none
            m-l:text-base"
      />
    </div>
  );
};

export default EditInput;
