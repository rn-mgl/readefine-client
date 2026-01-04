import React from "react";

import SearchFilter from "@/components/filter/SearchFilter";
import SortFilter from "@/components/filter/SortFilter";
import RangeFilter from "@/components/filter/RangeFilter";
import SelectFilter from "@/components/filter/SelectFilter";
import { BiChevronDown } from "react-icons/bi";
import { nanoid } from "nanoid";

const AdminActivitiesFilter = (props) => {
  const actionTypeLabelValue = [
    { label: "All", value: "" },
    { label: "Create", value: "C" },
    { label: "Read", value: "R" },
    { label: "Update", value: "U" },
    { label: "Delete", value: "D" },
  ];

  const mappedOptions = actionTypeLabelValue.map((data, index) => {
    return (
      <option key={nanoid()} value={data.value}>
        {data.label}
      </option>
    );
  });

  return (
    <div className="cstm-flex-row  gap-2 justify-start relative w-full overflow-x-auto p-2 cstm-scrollbar-2 min-h-[5rem]">
      <SearchFilter
        searchFilter={props.searchFilter}
        handleSearchFilter={props.handleSearchFilter}
        labelValue={[
          { label: "Name", value: "name" },
          { label: "Surname", value: "surname" },
          { label: "Email", value: "email" },
          { label: "Resource", value: "resource_name" },
        ]}
      />

      <SelectFilter
        onChange={props.handleTypeFilter}
        selectValue={props.typeFilter}
        name="resource_type"
        label="Resource Type"
        labelValue={[
          { label: "All", value: "" },
          { label: "Story", value: "story" },
          { label: "Test", value: "test" },
          { label: "Achievement", value: "achievement" },
          { label: "Reward", value: "reward" },
          { label: "User", value: "user" },
          { label: "Riddle", value: "riddle" },
        ]}
      />

      <div className="p-2 bg-white  rounded-md shadow-md whitespace-nowrap cstm-flex-row relative">
        <div
          className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 border-r-[1px] 
                    text-sm cstm-flex-row gap-1"
        >
          Activity Type
        </div>

        <div className="bg-neutral-white rounded-r-md outline-none border-neutral-200 border-2 border-l-[1px] cstm-flex-row">
          <select
            onChange={(e) => props.handleActivityTypeFilter(e.target)}
            value={props.activityTypeFilter}
            name="activity_type"
            className="bg-transparent p-1 px-2 outline-none text-sm"
          >
            {mappedOptions}
          </select>

          <div className="w-full opacity-50 px-1">
            <BiChevronDown className="text-xl" />
          </div>
        </div>
      </div>

      <SortFilter
        sortFilter={props.sortFilter}
        handleSortFilter={props.handleSortFilter}
        labelValue={[
          { label: "Name", value: "name" },
          { label: "Surname", value: "surname" },
          { label: "Email", value: "email" },
          { label: "Resource", value: "resource_name" },
          { label: "Date", value: "date_logged" },
        ]}
      />

      <RangeFilter
        fromLabel="Date From"
        handleRangeFilter={props.handleDateRangeFilter}
        fromRange={props.dateRangeFilter.from}
        type="date"
        toLabel="Date To"
        toRange={props.dateRangeFilter.to}
      />
    </div>
  );
};

export default AdminActivitiesFilter;
