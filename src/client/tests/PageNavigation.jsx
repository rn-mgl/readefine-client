import React from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const PageNavigation = (props) => {
  return (
    <div className="cstm-flex-col w-full mt-auto cstm-w-limit gap-4 t:gap-4">
      <div className="cstm-flex-row w-full">
        {props.activePage > 0 ? (
          <button
            onClick={props.handleDecrement}
            className="bg-prmColor mr-auto p-2 w-16 rounded-md cstm-flex-col font-medium text-accntColor shadow-solid shadow-indigo-950"
          >
            <AiFillCaretLeft />
          </button>
        ) : null}

        {props.activePage < 9 ? (
          <button
            onClick={props.handleIncrement}
            className="bg-prmColor ml-auto p-2 w-16 rounded-md cstm-flex-col font-medium text-accntColor shadow-solid shadow-indigo-950"
          >
            <AiFillCaretRight />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default PageNavigation;
