import React from "react";

import SortFilter from "@/components/filter/SortFilter";
import SelectFilter from "@/components/filter/SelectFilter";
import SearchFilter from "@/components/filter/SearchFilter";

const RewardsFilter = (props) => {
  return (
    <div className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto py-2 cstm-scrollbar-2 min-h-[5rem]">
      <SearchFilter
        searchFilter={props.searchFilter}
        handleSearchFilter={props.handleSearchFilter}
        labelValue={[{ label: "Name", value: "reward_name" }]}
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
        labelValue={[{ label: "Name", value: "reward_name" }]}
      />

      <SelectFilter
        onChange={props.handleShowFilter}
        selectValue={props.showFilter.toShow}
        name="toShow"
        labelValue={[
          { label: "All", value: "all" },
          { label: "Received", value: "received" },
        ]}
        label="Show"
      />
    </div>
  );
};

export default RewardsFilter;
