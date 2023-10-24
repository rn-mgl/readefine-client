"use client";
import React from "react";

const InputComp = (props) => {
  return (
    <div className="relative  text-prmColor w-full cstm-flex-col ">
      {props.icon ? (
        <div className="absolute right-0 text-lg transition-all bg-accntColor p-2 rounded-r-full">{props.icon}</div>
      ) : null}
      <input
        type={props.type}
        id={props.id}
        name={props.id}
        spellCheck={props.spellCheck}
        placeholder={props.placeholder}
        value={props.value}
        required={props.required}
        onChange={props.onChange}
        className="focus:rounded-full focus:px-3 focus:l-s:px-5 rounded-md px-2 l-s:px-3 
                   shadow-md bg-accntColor p-2 w-full text-sm font-normal transition-all
                    placeholder:text-prmColor placeholder:text-opacity-50
                    focus:outline-none focus:border-none"
      />
    </div>
  );
};

export default InputComp;
