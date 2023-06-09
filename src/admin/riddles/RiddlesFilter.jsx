import React from "react";

import SortFilter from "../../components/filter/SortFilter";
import SearchFilter from "../../components/filter/SearchFilter";
import RangeFilter from "../../components/filter/RangeFilter";

const RiddlesFilter = (props) => {
  return (
    <div className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto py-2 cstm-scrollbar">
      <SearchFilter
        handleSearchFilter={props.handleSearchFilter}
        searchFilter={props.searchFilter}
        labelValue={[
          { label: "Riddle", value: "riddle" },
          { label: "Answer", value: "answer" },
        ]}
      />

      <SortFilter
        handleSortFilter={props.handleSortFilter}
        sortFilter={props.sortFilter}
        labelValue={[
          { label: "Riddle", value: "riddle" },
          { label: "Answer", value: "answer" },
          { label: "Date Added", value: "date_added" },
        ]}
      />

      <RangeFilter
        fromLabel="Date From"
        handleRangeFilter={props.handleDateRangeFilter}
        fromRange={props.dateRangeFilter.from}
        type="date"
        toRange={props.dateRangeFilter.to}
        toLabel="Date To"
      />
    </div>
  );
};

export default RiddlesFilter;
