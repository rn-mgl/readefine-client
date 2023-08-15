import React from "react";

import SearchFilter from "../../components/filter/SearchFilter";
import SortFilter from "../../components/filter/SortFilter";
import RangeFilter from "../../components/filter/RangeFilter";

const StoriesFilter = (props) => {
  return (
    <div className="cstm-flex-row gap-2  justify-start relative w-full overflow-x-auto p-2 cstm-scrollbar-2  min-h-[5rem]">
      <SearchFilter
        searchFilter={props.searchFilter}
        handleSearchFilter={props.handleSearchFilter}
        labelValue={[
          { label: "Title", value: "title" },
          { label: "Author", value: "author" },
          { label: "Genre", value: "genre" },
          { label: "Lexile", value: "lexile" },
        ]}
      />

      <SortFilter
        sortFilter={props.sortFilter}
        handleSortFilter={props.handleSortFilter}
        labelValue={[
          { label: "Title", value: "title" },
          { label: "Author", value: "author" },
          { label: "Genre", value: "genre" },
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
    </div>
  );
};

export default StoriesFilter;
