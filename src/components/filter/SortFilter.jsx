import React from "react";
import { BsArrowUp } from "react-icons/bs";

const SortFilter = (props) => {
  const mappedOptions = props.labelValue.map((data) => {
    return (
      <option key={data.value} value={data.value}>
        {data.label}
      </option>
    );
  });

  const firstOption = mappedOptions[0]?.props?.children;

  return (
    <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
      {mappedOptions.length < 2 ? (
        <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <p>{firstOption}</p>
        </div>
      ) : (
        <select
          onChange={(e) => props.handleSortFilter(e.target)}
          value={props.sortFilter.toSort}
          name="toSort"
          className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm"
        >
          {mappedOptions}
        </select>
      )}

      <select
        onChange={(e) => props.handleSortFilter(e.target)}
        value={props.sortFilter.sortMode}
        name="sortMode"
        className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
              focus:outline-none "
      >
        <option className="cstm-flex-row gap-2" value="ASC">
          Ascending
        </option>
        <option className="cstm-flex-row gap-2" value="DESC">
          Descending
        </option>
      </select>
      <BsArrowUp
        className={`${
          props.sortFilter.sortMode === "ASC" ? "rotate-0" : "rotate-180"
        } transition-all mx-1`}
      />
    </div>
  );
};

export default SortFilter;
