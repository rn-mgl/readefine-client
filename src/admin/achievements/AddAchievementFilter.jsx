import React from "react";
import { IoAddOutline } from "react-icons/io5";

const AddAchievementFilter = () => {
  return (
    <div
      className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto p-2 cstm-scrollbar
                l-s:w-[70%] l-s:ml-auto
                l-l:w-[80%]"
    >
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

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <p>Reward</p>
        </div>
        <input
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
        />
      </div>
    </div>
  );
};

export default AddAchievementFilter;
