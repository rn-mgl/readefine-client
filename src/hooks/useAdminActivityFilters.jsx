import React from "react";
import { inputDate } from "../functions/localDate";

export default function useAdminActivityFilters() {
  const [searchFilter, setSearchFilter] = React.useState({ toSearch: "name", searchKey: "" });
  const [sortFilter, setSortFilter] = React.useState({ toSort: "date_logged", sortMode: "DESC" });
  const [resourceTypeFilter, setResourceTypeFilter] = React.useState("");
  const [activityTypeFilter, setActivityTypeFilter] = React.useState("");
  const [dateRangeFilter, setDateRangeFilter] = React.useState({
    from: "",
    to: inputDate(new Date().toLocaleDateString()),
  });

  const handleSearchFilter = ({ name, value }) => {
    setSearchFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSortFilter = ({ name, value }) => {
    setSortFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleDateRangeFilter = ({ name, value }) => {
    setDateRangeFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleResourceTypeFilter = ({ value }) => {
    setResourceTypeFilter(value);
  };

  const handleActivityTypeFilter = ({ value }) => {
    setActivityTypeFilter(value);
  };
  return {
    searchFilter,
    sortFilter,
    resourceTypeFilter,
    activityTypeFilter,
    dateRangeFilter,
    handleSearchFilter,
    handleSortFilter,
    handleDateRangeFilter,
    handleResourceTypeFilter,
    handleActivityTypeFilter,
  };
}
