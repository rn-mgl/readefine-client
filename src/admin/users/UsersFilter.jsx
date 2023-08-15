import React from "react";
import SearchFilter from "../../components/filter/SearchFilter";
import SortFilter from "../../components/filter/SortFilter";
import RangeFilter from "../../components/filter/RangeFilter";

const UsersFilter = (props) => {
  return (
    <div className="cstm-flex-row gap-2  justify-start relative w-full overflow-x-auto p-2 cstm-scrollbar-2 cstm-w-limit min-h-[5rem]">
      <SearchFilter
        handleSearchFilter={props.handleSearchFilter}
        searchFilter={props.searchFilter}
        labelValue={[
          { label: "First Name", value: "name" },
          { label: "Last Name", value: "surname" },
          { label: "Username", value: "username" },
          { label: "Email", value: "email" },
          { label: "Lexile", value: "lexile" },
          { label: "Grade", value: "grade_level" },
        ]}
      />

      <SortFilter
        handleSortFilter={props.handleSortFilter}
        sortFilter={props.sortFilter}
        labelValue={[
          { label: "First Name", value: "name" },
          { label: "Last Name", value: "surname" },
          { label: "Username", value: "username" },
          { label: "Email", value: "email" },
          { label: "Lexile", value: "lexile" },
          { label: "Grade", value: "grade_level" },
          { label: "Date Joined", value: "date_joined" },
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

export default UsersFilter;
