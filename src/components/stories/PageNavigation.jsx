import React from "react";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const PageNavigation = (props) => {
  return (
    <div className="cstm-flex-row w-full cstm-w-limit">
      <button
        disabled={props.activePage === 1}
        className="cstm-bg-hover disabled:opacity-50"
      >
        <BiChevronLeft
          className={`scale-150 text-black  cursor-pointer t:scale-[2]`}
          onClick={props.handleDecrement}
          onKeyDown={(e) => props.handleDecrement(e)}
        />
      </button>

      <input
        onChange={(e) => props.handleActivePage(e.target)}
        type="number"
        value={props.activePage}
        min={1}
        max={props.pages.length}
        className="text-sm mx-auto text-center w-16 rounded-md px-2 py-1 focus:outline-prmColor"
      />

      <button
        disabled={props.activePage === props.pages.length}
        className="cstm-bg-hover disabled:opacity-50"
      >
        <BiChevronRight
          className={`scale-150 text-black  cursor-pointer t:scale-[2]`}
          onClick={props.handleIncrement}
          onKeyDown={(e) => props.handleIncrement(e)}
        />
      </button>
    </div>
  );
};

export default PageNavigation;
