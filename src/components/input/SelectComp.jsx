import React from "react";

const SelectComp = (props) => {
  const mappedOptions = props.labelValue?.map((data) => {
    return (
      <option key={data.value} value={data.value}>
        {data.label}
      </option>
    );
  });

  return (
    <select
      className="focus:rounded-full focus:px-4 focus:l-s:px-6 rounded-md px-2 l-s:px-3
                shadow-md bg-accntColor p-2 w-full text-sm font-normal transition-all
                text-prmColor focus:outline-none focus:border-none"
      name="gradeLevel"
      value={props.value}
      required={props.true}
      onChange={(e) => props.onChange(e.target)}
    >
      {mappedOptions}
    </select>
  );
};

export default SelectComp;
