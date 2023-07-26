import React from "react";

import SortFilter from "../../components/filter/SortFilter";
import SelectFilter from "../../components/filter/SelectFilter";
import InputFilter from "../../components/filter/InputFilter";
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
