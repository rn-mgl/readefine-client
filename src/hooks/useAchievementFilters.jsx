import React from "react";
import { inputDate } from "../functions/localDate";

export const useAchievementFilters = () => {
  const [typeFilter, setTypeFilter] = React.useState("");
  const [goalRangeFilter, setGoalRangeFilter] = React.useState({ from: 0, to: 1250 });
  const [searchFilter, setSearchFilter] = React.useState({ toSearch: "achievement_name", searchKey: "" });
  const [sortFilter, setSortFilter] = React.useState({ toSort: "achievement_name", sortMode: "ASC" });
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

  // handle onchange on goal range filter
  const handleGoalRangeFilter = ({ name, value }) => {
    setGoalRangeFilter((prev) => {
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

  return {
    typeFilter,
    goalRangeFilter,
    searchFilter,
    sortFilter,
    dateRangeFilter,
    handleSearchFilter,
    handleDateRangeFilter,
    handleGoalRangeFilter,
    handleSortFilter,
    handleTypeFilter,
  };
};
