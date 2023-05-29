import React from "react";

const InputFilter = (props) => {
  return (
    <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
      <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
        <p>{props.label}</p>
      </div>
      <input
        className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
              focus:outline-none"
        placeholder={props.placeholder}
        name={props.name}
        type={props.type}
        required={props.required}
        value={props.value}
        onChange={(e) => props.onChange(e.target)}
      />
    </div>
  );
};

export default InputFilter;
