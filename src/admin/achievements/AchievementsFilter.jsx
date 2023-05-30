import React from "react";
import { IoAddOutline } from "react-icons/io5";
import Link from "next/link";
import SearchFilter from "../../components/filter/SearchFilter";
import SortFilter from "../../components/filter/SortFilter";
import RangeFilter from "../../components/filter/RangeFilter";

const AchievementsFilter = (props) => {
  return (
    <div
      className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto p-2 cstm-scrollbar
                l-s:w-[70%] l-s:ml-auto
                l-l:w-[80%]"
    >
      <Link
        href="/controller/achievements/add"
        className="hover:bg-black hover:bg-opacity-10 transition-all p-2 rounded-full"
      >
        <IoAddOutline className="text-prmColor cursor-pointer scale-150" />
      </Link>

      <SearchFilter
        searchFilter={props.searchFilter}
        handleSearchFilter={props.handleSearchFilter}
        labelValue={[
          { label: "Name", value: "achievement_name" },
          { label: "Type", value: "achievement_type" },
          { label: "Goal", value: "goal" },
        ]}
      />

      <SortFilter
        sortFilter={props.sortFilter}
        handleSortFilter={props.handleSortFilter}
        labelValue={[
          { label: "Name", value: "achievement_name" },
          { label: "Type", value: "achievement_type" },
          { label: "Goal", value: "goal" },
          { label: "Date", value: "date_added" },
        ]}
      />

      <RangeFilter
        fromLabel="Goal From"
        handleRangeFilter={props.handleGoalRangeFilter}
        fromRange={props.goalRangeFilter.from}
        type="number"
        toLabel="Goal To"
        toRange={props.goalRangeFilter.to}
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

export default AchievementsFilter;
