import React from "react";

const UsersFilter = () => {
  return (
    <div
      className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto p-2
                l-s:w-[70%] l-s:ml-auto
                l-l:w-[80%]"
    >
      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap">
        <select className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <option>First Name</option>
          <option>Last Name</option>
          <option>Email</option>
          <option>Username</option>
          <option>Lexile</option>
          <option>Grade</option>
        </select>
        <input
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
                    focus:outline-none "
        />
      </div>

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap">
        <select className="bg-neutral-50 p-1 px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm">
          <option>First Name</option>
          <option>Last Name</option>
          <option>Email</option>
          <option>Username</option>
          <option>Lexile</option>
          <option>Grade</option>
          <option>Date Joined</option>
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
          <p>Date Joined</p>
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

export default UsersFilter;
