import React from "react";
import { BsCheck, BsCheckLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const InputChoices = (props) => {
  const answerIdentifier = `answer${props.testNumber}`;
  return (
    <div className="cstm-flex-row gap-2 w-full h-full">
      <label htmlFor={answerIdentifier + props.choiceValue} className="h-full">
        <input
          type="radio"
          className="hidden peer"
          checked={props.checked}
          name={answerIdentifier}
          id={answerIdentifier + props.choiceValue}
          value={props.choiceValue}
          onChange={(e) => props.handlePages(props.testNumber, e.target)}
        />
        <div
          className={`p-3.5 rounded-md  cstm-flex-col transition-all 
                    font-light text-sm cursor-pointer h-full w-14 shadow-solid active:shadow-solidActive
                    ${
                      props.checked
                        ? " bg-prmColor text-scndColor font-semibold shadow-indigo-950"
                        : "bg-scndColor text-prmColor shadow-cyan-800"
                    }`}
        >
          {props.checked ? <BsCheckLg className="scale-125" /> : <IoClose className="scale-125" />}
        </div>
      </label>

      <textarea
        name={props.name}
        required={true}
        id={props.name}
        cols="30"
        rows="1"
        value={props.choiceValue}
        placeholder="possible answer..."
        onChange={(e) => props.handlePages(props.testNumber, e.target)}
        className="resize-none p-4 focus:outline-none w-full h-full ml-auto rounded-md text-sm shadow-md placeholder:opacity-50"
      />
    </div>
  );
};

export default InputChoices;
