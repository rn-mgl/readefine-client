import React from "react";
import { IoAddOutline } from "react-icons/io5";
import Link from "next/link";
import SearchFilter from "../../components/filter/SearchFilter";
import SortFilter from "../../components/filter/SortFilter";
import RangeFilter from "../../components/filter/RangeFilter";

const RewardsFilter = (props) => {
  return (
    <div
      className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto p-2 cstm-scrollbar
                l-s:w-[70%] l-s:ml-auto
                l-l:w-[80%]"
    >
      <Link
        href="/controller/rewards/add"
        className="hover:bg-black hover:bg-opacity-10 transition-all p-2 rounded-full"
      >
        <IoAddOutline className="text-prmColor cursor-pointer scale-150" />
      </Link>

      <SearchFilter
        handleSearchFilter={props.handleSearchFilter}
        searchFilter={props.searchFilter}
        labelValue={[
          { label: "Name", value: "reward_name" },
          { label: "Type", value: "reward_type" },
        ]}
      />

      <SortFilter
        handleSortFilter={props.handleSortFilter}
        sortFilter={props.sortFilter}
        labelValue={[
          { label: "Name", value: "reward_name" },
          { label: "Date", value: "date_added" },
          { label: "Type", value: "reward_type" },
        ]}
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

export default RewardsFilter;
