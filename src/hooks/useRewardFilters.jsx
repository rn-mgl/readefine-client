import React from "react";
import { inputDate } from "../functions/localDate";

export const useRewardFilters = () => {
  const [sortFilter, setSortFilter] = React.useState({ toSort: "reward_name", sortMode: "ASC" });
  const [typeFilter, setTypeFilter] = React.useState("");
  const [searchFilter, setSearchFilter] = React.useState({ toSearch: "reward_name", searchKey: "" });
  const [showFilter, setShowFilter] = React.useState({ toShow: "received" });
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

  // handle onchange on date range filter
  const handleDateRangeFilter = ({ name, value }) => {
    setDateRangeFilter((prev) => {
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

  // handle onchange on type filter
  const handleTypeFilter = ({ value }) => {
    setTypeFilter(value);
  };

  // handle onchange on what to show filter
  const handleShowFilter = ({ name, value }) => {
    setShowFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return {
    sortFilter,
    typeFilter,
    searchFilter,
    dateRangeFilter,
    showFilter,
    handleSearchFilter,
    handleDateRangeFilter,
    handleSortFilter,
    handleTypeFilter,
    handleShowFilter,
  };
};
