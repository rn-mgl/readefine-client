import React from "react";
import { IoAddOutline } from "react-icons/io5";

const AddTestFilter = (props) => {
  return (
    <div
      className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto p-2 cstm-scrollbar
                l-s:w-[70%] l-s:ml-auto
                l-l:w-[80%]"
    >
      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row gap-2">
        <div className="bg-neutral-50 p-1 px-2 rounded-md outline-none border-neutral-200 border-2 text-sm">
          <p>Page</p>
        </div>
        <div className="hover:bg-black hover:bg-opacity-10 transition-all rounded-full p-2">
          <IoAddOutline
            onClick={props.addPage}
            className="cursor-pointer text-prmColor scale-150"
          />
        </div>
      </div>
    </div>
  );
};

export default AddTestFilter;
