import React from "react";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { handleActivePage, handleDecrement, handleIncrement } from "../../functions/storyFns";

const PageNavigation = (props) => {
  return (
    <div className="cstm-flex-row w-full cstm-w-limit">
      <button disabled={props.activePage === 1} className="cstm-bg-hover disabled:opacity-50">
        <BiChevronLeft
          className={`scale-150 text-black  cursor-pointer t:scale-[2]`}
          onClick={(e) => handleDecrement(props.setActivePage, props.viewType)}
        />
      </button>

      <input
        onChange={(e) => handleActivePage(e.target, props.setActivePage, props.pages)}
        type="number"
        value={props.activePage}
        min={1}
        max={props.pages.length}
        className="text-sm mx-auto text-center w-16 rounded-md px-2 py-1 focus:outline-prmColor"
      />

      <button disabled={props.activePage === props.pages.length} className="cstm-bg-hover disabled:opacity-50">
        <BiChevronRight
          className={`scale-150 text-black  cursor-pointer t:scale-[2]`}
          onClick={() => handleIncrement(props.setActivePage, props.viewType, props.pages)}
        />
      </button>
    </div>
  );
};

export default PageNavigation;
