import React from "react";
import { IoAddOutline } from "react-icons/io5";
import Link from "next/link";

const AchievementsFilter = () => {
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

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <p>Name</p>
        </div>
        <input
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
        />
      </div>

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <p>Type</p>
        </div>
        <input
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
        />
      </div>

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <p>Goal</p>
        </div>
        <input
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
        />
      </div>

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap">
        <select className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <option>Name</option>
          <option>Type</option>
          <option>Goal</option>
          <option>Date Added</option>
        </select>
        <select
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
        >
          <option>Ascending</option>
          <option>Descending</option>
        </select>
      </div>

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <p>Date Added</p>
        </div>
        <input
          className="px-2 p-1 bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
          type="date"
        />
      </div>
    </div>
  );
};

export default AchievementsFilter;
