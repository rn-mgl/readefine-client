import React from "react";
import SortFilter from "../../components/filter/SortFilter";
import SearchFilter from "../../components/filter/SearchFilter";
import RangeFilter from "../../components/filter/RangeFilter";

const TestsFilter = (props) => {
  return (
    <div className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto p-2 cstm-scrollbar ">
      <SearchFilter
        handleSearchFilter={props.handleSearchFilter}
        searchFilter={props.searchFilter}
        labelValue={[
          { label: "Title", value: "title" },
          { label: "Author", value: "author" },
          { label: "Lexile", value: "lexile_level" },
        ]}
      />

      <SortFilter
        handleSortFilter={props.handleSortFilter}
        sortFilter={props.sortFilter}
        labelValue={[
          { label: "Title", value: "title" },
          { label: "Author", value: "author" },
          { label: "Lexile", value: "lexile_level" },
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
    </div>
  );
};

export default TestsFilter;
