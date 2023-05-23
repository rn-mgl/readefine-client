import React from "react";
import { IoAddOutline } from "react-icons/io5";
import Link from "next/link";

const StoriesFilter = (props) => {
  return (
    <div
      className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto p-2 cstm-scrollbar
                l-s:w-[70%] l-s:ml-auto
                l-l:w-[80%]"
    >
      <Link
        href="/controller/stories/add"
        className="hover:bg-black hover:bg-opacity-10 transition-all p-2 rounded-full"
      >
        <IoAddOutline className="text-prmColor cursor-pointer scale-150" />
      </Link>

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <select
          onChange={(e) => props.handleSearchFilter(e.target)}
          value={props.searchFilter.toSearch}
          name="toSearch"
          className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="genre">Genre</option>
          <option value="lexile">Lexile</option>
        </select>
        <input
          onChange={(e) => props.handleSearchFilter(e.target)}
          value={props.searchFilter.searchKey}
          name="searchKey"
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
        />
      </div>

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap">
        <select
          onChange={(e) => props.handleSortFilter(e.target)}
          value={props.sortFilter.toSort}
          name="toSort"
          className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="lexile">Lexile</option>
          <option value="date_added">Date Added</option>
        </select>
        <select
          onChange={(e) => props.handleSortFilter(e.target)}
          value={props.sortFilter.sortMode}
          name="sortMode"
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <p>Lexile From</p>
        </div>
        <input
          onChange={(e) => props.handleLexileRangeFilter(e.target)}
          value={props.lexileRangeFilter.from}
          name="from"
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
          type="number"
        />
      </div>

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <p>Lexile To</p>
        </div>
        <input
          onChange={(e) => props.handleLexileRangeFilter(e.target)}
          value={props.lexileRangeFilter.to}
          name="to"
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
          type="number"
        />
      </div>

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <p>Date From</p>
        </div>
        <input
          onChange={(e) => props.handleDateRangeFilter(e.target)}
          value={props.dateRangeFilter.from}
          name="from"
          className="px-2 p-1 bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
          type="date"
        />
      </div>

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <p>Date To</p>
        </div>
        <input
          onChange={(e) => props.handleDateRangeFilter(e.target)}
          value={props.dateRangeFilter.to}
          name="to"
          className="px-2 p-1 bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
          type="date"
        />
      </div>
    </div>
  );
};

export default StoriesFilter;
