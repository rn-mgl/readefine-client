import React from "react";
import SortFilter from "../../components/filter/SortFilter";
import SearchFilter from "../../components/filter/SearchFilter";
import RangeFilter from "../../components/filter/RangeFilter";

const TestsFilter = (props) => {
  return (
    <div className="cstm-flex-row gap-2  justify-start relative w-full overflow-x-auto p-2 cstm-scrollbar-2 min-h-[5rem]">
      <SearchFilter
        handleSearchFilter={props.handleSearchFilter}
        searchFilter={props.searchFilter}
        labelValue={[
          { label: "Title", value: "title" },
          { label: "Author", value: "author" },
          { label: "Lexile", value: "lexile" },
        ]}
      />

      <SortFilter
        handleSortFilter={props.handleSortFilter}
        sortFilter={props.sortFilter}
        labelValue={[
          { label: "Title", value: "title" },
          { label: "Author", value: "author" },
          { label: "Lexile", value: "lexile" },
        ]}
      />

      <RangeFilter
        fromLabel="Lexile From"
        handleRangeFilter={props.handleLexileRangeFilter}
        fromRange={props.lexileRangeFilter.from}
        type="number"
        toLabel="Lexile To"
        toRange={props.lexileRangeFilter.to}
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

export default TestsFilter;
