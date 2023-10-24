import React from "react";

const InputFilter = (props) => {
  return (
    <div className="p-2 bg-white  rounded-md shadow-md whitespace-nowrap cstm-flex-row relative">
      <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
        <p>{props.label}</p>
      </div>
      <input
        className="p-1 px-2  bg-white  rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
              focus:outline-none"
        placeholder={props.placeholder}
        name={props.name}
        type={props.type}
        required={props.required}
        value={props.value}
        onChange={(e) => props.onChange(e.target)}
      />

      {props.icon ? <div className="absolute right-4 p-1 bg-white">{props.icon}</div> : null}
    </div>
  );
};

export default InputFilter;
