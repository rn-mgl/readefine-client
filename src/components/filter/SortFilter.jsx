import React from "react";

const SortFilter = (props) => {
  const mappedOptions = props.labelValue.map((data) => {
    return (
      <option key={data.value} value={data.value}>
        {data.label}
      </option>
    );
  });

  return (
    <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap">
      <select
        onChange={(e) => props.handleSortFilter(e.target)}
        value={props.sortFilter.toSort}
        name="toSort"
        className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm"
      >
        {mappedOptions}
      </select>
      <select
        onChange={(e) => props.handleSortFilter(e.target)}
        value={props.sortFilter.sortMode}
        name="sortMode"
        className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
              focus:outline-none "
      >
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>
  );
};

export default SortFilter;
