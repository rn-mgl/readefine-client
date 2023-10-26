import React from "react";
import SortFilter from "@/components/filter/SortFilter";
import SearchFilter from "@/components/filter/SearchFilter";

const TestsFilter = (props) => {
  return (
    <div className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto p-2 cstm-scrollbar-2 ">
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
    </div>
  );
};

export default TestsFilter;
