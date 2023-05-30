import React from "react";

const RangeFilter = (props) => {
  const cstmRem = props.type === "date" ? "p-[.32rem]" : "p-1";
  return (
    <>
      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div
          className={`bg-neutral-50 ${cstmRem} px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm`}
        >
          <p>{props.fromLabel}</p>
        </div>
        <input
          onChange={(e) => props.handleRangeFilter(e.target)}
          value={props.fromRange}
          name="from"
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
              focus:outline-none "
          type={props.type}
        />
      </div>

      <div className="p-2 bg-white font-poppins rounded-md shadow-md whitespace-nowrap cstm-flex-row">
        <div
          className={`bg-neutral-50 ${cstmRem} px-2 rounded-l-md outline-none border-neutral-200 border-2 text-sm`}
        >
          <p>{props.toLabel}</p>
        </div>
        <input
          onChange={(e) => props.handleRangeFilter(e.target)}
          value={props.toRange}
          name="to"
          className="p-1 px-2  bg-white font-poppins rounded-r-md border-neutral-200 border-2 border-l-0 text-sm
              focus:outline-none "
          type={props.type}
        />
      </div>
    </>
  );
};

export default RangeFilter;
