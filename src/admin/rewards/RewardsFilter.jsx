import React from "react";

import SearchFilter from "../../components/filter/SearchFilter";
import SortFilter from "../../components/filter/SortFilter";
import RangeFilter from "../../components/filter/RangeFilter";
import InputFilter from "../../components/filter/InputFilter";
import SelectFilter from "../../components/filter/SelectFilter";
import { BiSearch } from "react-icons/bi";

const RewardsFilter = (props) => {
  return (
    <div className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto py-2 cstm-scrollbar">
      <InputFilter
        label="Name"
        placeholder="Search..."
        name="reward_name"
        type="text"
        value={props.searchFilter}
        icon={<BiSearch className="opacity-50" />}
        onChange={props.handleSearchFilter}
      />

      <SelectFilter
        label="Type"
        name="reward_type"
        selectValue={props.typeFilter}
        onChange={props.handleTypeFilter}
        labelValue={[
          { label: "All", value: "" },
          { label: "Trophy", value: "Trophy" },
          { label: "Badge", value: "Badge" },
        ]}
      />

      <SortFilter
        handleSortFilter={props.handleSortFilter}
        sortFilter={props.sortFilter}
        labelValue={[
          { label: "Name", value: "reward_name" },
          { label: "Date", value: "date_added" },
          { label: "Type", value: "reward_type" },
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

export default RewardsFilter;
