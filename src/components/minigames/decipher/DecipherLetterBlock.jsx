import React from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { BsPlusSlashMinus } from "react-icons/bs";

const DecipherLetterBlock = (props) => {
  return (
    <div className="animate-slideDown cstm-flex-col gap-4">
      <button
        onClick={props.incrementLetter}
        className="bg-prmColor bg-opacity-20 w-10 h-10 m-l:w-12 m-l:h-12 t:w-16 t:h-16 cstm-flex-col rounded-md shadow-solid shadow-prmColor active:shadow-solidActive "
      >
        <BiChevronUp className="scale-150" />
      </button>
      <div className="cstm-flex-col p-2 animate-fadeIn gap-2">
        <p className="text-sm font-bold text-accntColor bg-black rounded-md w-10 h-10 m-l:w-12 m-l:h-12 cstm-flex-col t:w-16 t:h-16 t:text-lg">
          {props.letter}
        </p>
        <div className="cstm-flex-row font-medium text-xs text-black bg-neutral-200 rounded-md w-10 h-10 m-l:w-12 m-l:h-12 t:w-16 t:h-16 cstm-flex-col gap-1 t:text-sm t:gap-2">
          <BsPlusSlashMinus />
          <p>{props.skips}</p>
        </div>
      </div>
      <button
        onClick={props.decrementLetter}
        className="bg-prmColor bg-opacity-20 w-10 h-10 m-l:w-12 m-l:h-12 t:w-16 t:h-16 cstm-flex-col rounded-md shadow-solid shadow-prmColor active:shadow-solidActive "
      >
        <BiChevronDown className="scale-150" />
      </button>
    </div>
  );
};

export default DecipherLetterBlock;
