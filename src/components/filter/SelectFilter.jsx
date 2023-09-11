import React from "react";
import { BiChevronDown } from "react-icons/bi";

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
      <div
        className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 border-r-[1px] 
                    text-sm cstm-flex-row gap-1"
      >
        {props.label}
      </div>

      <div className="bg-neutral-white rounded-r-md outline-none border-neutral-200 border-2 border-l-[1px] cstm-flex-row">
        <select
          onChange={(e) => props.onChange(e.target)}
          value={props.selectValue}
          required={props.required}
          name={props.name}
          className="bg-transparent p-1 px-2 outline-none text-sm"
        >
          {mappedOptions}
        </select>

        <div className="w-full opacity-50 px-1">
          <BiChevronDown className="scale-125" />
        </div>
      </div>
    </div>
  );
};

export default SelectFilter;
