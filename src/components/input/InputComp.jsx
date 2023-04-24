"use client";
import React from "react";

const InputComp = (props) => {
  const [selectedField, setSelectedField] = React.useState([]);

  const handleSelectedField = (field) => {
    setSelectedField((prev) => [...prev, field]);
  };
  console.log(selectedField);
  const isSelected = (field) => {
    return selectedField.includes(field);
  };

  return (
    <div className="relative font-poppins  font-light text-prmColor w-full cstm-flex-col ">
      <label
        htmlFor={props.id}
        className={`w-full absolute translate-x-3.5 text-sm select-none transition-all
                    ${
                      isSelected(props.id)
                        ? "translate-x-1.5 -translate-y-5 text-xs l-s:-translate-y-6"
                        : "translate-x-0 -translate-y-0 text-sm t:"
                    }
                    l-s:text-base`}
        onClick={() => handleSelectedField(props.id)}
      >
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.id}
        name={props.id}
        placeholder={props.placeholder}
        className="rounded-md shadow-md bg-accntColor p-2 w-full text-sm font-normal
                    focus:outline-none focus:border-none
                    m-l:text-base
                    t:text-lg
                    l-s:text-xl"
      />
    </div>
  );
};

export default InputComp;
