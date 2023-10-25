import React from "react";
import { inputDate } from "../functions/localDate";

export default function useUserFilters() {
  const [searchFilter, setSearchFilter] = React.useState({
    toSearch: "name",
    searchKey: "",
  });
  const [sortFilter, setSortFilter] = React.useState({
    toSort: "name",
    sortMode: "ASC",
  });
  const [lexileRangeFilter, setLexileRangeFilter] = React.useState({
    from: 0,
    to: 1250,
  });
  const [dateRangeFilter, setDateRangeFilter] = React.useState({
    from: "",
    to: inputDate(new Date().toLocaleDateString()),
  });

  // handle onchange on search filter
  const handleSearchFilter = ({ name, value }) => {
    setSearchFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle onchange on sort filter
  const handleSortFilter = ({ name, value }) => {
    setSortFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle onchange on date range filter
  const handleDateRangeFilter = ({ name, value }) => {
    setDateRangeFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle onchange on lexile range filter
  const handleLexileRangeFilter = ({ name, value }) => {
    setLexileRangeFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return {
    searchFilter,
    sortFilter,
    lexileRangeFilter,
    dateRangeFilter,
    handleSearchFilter,
    handleSortFilter,
    handleDateRangeFilter,
    handleLexileRangeFilter,
  };
}
