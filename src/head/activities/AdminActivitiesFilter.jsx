import React from "react";

import SearchFilter from "@/components/filter/SearchFilter";
import SortFilter from "@/components/filter/SortFilter";
import RangeFilter from "@/components/filter/RangeFilter";
import SelectFilter from "@/components/filter/SelectFilter";

const AdminActivitiesFilter = (props) => {
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
          { label: "Riddle", value: "riddle" },
        ]}
      />

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
