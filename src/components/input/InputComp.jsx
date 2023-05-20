"use client";
import React from "react";

const InputComp = (props) => {
  return (
    <div className="relative font-poppins text-prmColor w-full cstm-flex-col ">
      {props.icon ? (
        <div className="absolute right-3 text-lg transition-all">{props.icon}</div>
      ) : null}
      <input
        type={props.type}
        id={props.id}
        name={props.id}
        spellCheck={props.spellCheck}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className="focus:rounded-full focus:px-4 focus:l-s:px-6 rounded-md px-2 l-s:px-3
                   shadow-md bg-accntColor p-2 w-full text-sm font-normal transition-all
                    placeholder:text-prmColor placeholder:text-opacity-50
                    focus:outline-none focus:border-none
                    m-l:text-base
                    t:text-lg
                    l-s:p-3"
      />
    </div>
  );
};

export default InputComp;
