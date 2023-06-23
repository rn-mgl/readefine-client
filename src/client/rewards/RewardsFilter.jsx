import React from "react";

import SearchFilter from "../../components/filter/SearchFilter";
import SortFilter from "../../components/filter/SortFilter";
import RangeFilter from "../../components/filter/RangeFilter";
import SelectFilter from "../../components/filter/SelectFilter";
import InputFilter from "../../components/filter/InputFilter";

const RewardsFilter = (props) => {
  return (
    <div className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto py-2 cstm-scrollbar">
      <SearchFilter
        handleSearchFilter={props.handleSearchFilter}
        searchFilter={props.searchFilter}
        labelValue={[{ label: "Name", value: "reward_name" }]}
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
