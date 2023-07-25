import React from "react";

const SelectFilter = (props) => {
  const mappedOptions = props.labelValue.map((data, index) => {
    return (
      <option key={data.value + index} value={data.value}>
        {data.label}
      </option>
    );
  });

  return (
    <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row relative">
      <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
        {props.label}
      </div>
      <select
        onChange={(e) => props.onChange(e.target)}
        value={props.selectValue}
        required={props.required}
        name={props.name}
        className="bg-white p-1 px-2 rounded-r-md border-l-0 outline-none border-neutral-200 border-2 text-sm"
      >
        {mappedOptions}
      </select>
    </div>
  );
};

export default SelectFilter;
