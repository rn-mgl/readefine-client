import React from "react";

import SearchFilter from "../../components/filter/SearchFilter";
import SortFilter from "../../components/filter/SortFilter";
import RangeFilter from "../../components/filter/RangeFilter";

const AchievementsFilter = (props) => {
  return (
    <div className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto p-2 cstm-scrollbar">
      <SearchFilter
        searchFilter={props.searchFilter}
        handleSearchFilter={props.handleSearchFilter}
        labelValue={[
          { label: "Name", value: "achievement_name" },
          { label: "Goal", value: "goal" },
        ]}
      />

      <SortFilter
        sortFilter={props.sortFilter}
        handleSortFilter={props.handleSortFilter}
        labelValue={[
          { label: "Name", value: "achievement_name" },
          { label: "Type", value: "achievement_type" },
          { label: "Goal", value: "goal" },
          { label: "Date", value: "date_added" },
        ]}
      />

      <RangeFilter
        fromLabel="Goal From"
        handleRangeFilter={props.handleGoalRangeFilter}
        fromRange={props.goalRangeFilter.from}
        type="number"
        toLabel="Goal To"
        toRange={props.goalRangeFilter.to}
      />
    </div>
  );
};

export default AchievementsFilter;
