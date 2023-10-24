import React from "react";
import { BiChevronDown, BiSearch } from "react-icons/bi";

const SearchFilter = (props) => {
  const mappedOptions = props.labelValue.map((data) => {
    return (
      <option key={data.value} value={data.value}>
        {data.label}
      </option>
    );
  });

  const firstOption = mappedOptions[0]?.props?.children;

  return (
    <div className="p-2 bg-white  rounded-md shadow-md whitespace-nowrap cstm-flex-row relative">
      {mappedOptions.length < 2 ? (
        <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <p>{firstOption}</p>
        </div>
      ) : (
        <div className="bg-neutral-50 rounded-l-md outline-none border-neutral-200 border-2 cstm-flex-row">
          <select
            onChange={(e) => props.handleSearchFilter(e.target)}
            value={props.searchFilter.toSearch}
            name="toSearch"
            className="px-2 p-1 outline-none bg-transparent text-sm"
          >
            {mappedOptions}
          </select>

          <div className="w-full opacity-50 px-1">
            <BiChevronDown className="scale-125" />
          </div>
        </div>
      )}

      <input
        onChange={(e) => props.handleSearchFilter(e.target)}
        value={props.searchFilter.searchKey}
        name="searchKey"
        placeholder={`Search...`}
        className="p-1 px-2  bg-white  rounded-r-md border-neutral-200 border-2 border-l-0 text-sm placeholder:capitalize
              focus:outline-none "
      />
      <div className="absolute right-4 p-1 bg-white">
        <BiSearch className="opacity-50" />
      </div>
    </div>
  );
};

export default SearchFilter;
