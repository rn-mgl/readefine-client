import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const EditInputChoices = (props) => {
  const answerIdentifier = `answer${props.questionId}`;
  return (
    <div className="cstm-flex-row gap-2 w-full h-ful">
      <label htmlFor={answerIdentifier + props.choiceValue}>
        <input
          type="radio"
          className="hidden peer"
          checked={props.checked}
          name={answerIdentifier}
          id={answerIdentifier + props.choiceValue}
          value={props.choiceValue}
          onChange={(e) => props.handleQuestions(props.questionId, e.target)}
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
          {props.checked ? <BsCheckLg className="text-xl" /> : <IoClose className="text-xl" />}
        </div>
      </label>

      <textarea
        name={props.name}
        id={props.name}
        cols="30"
        rows="1"
        required={true}
        value={props.choiceValue}
        placeholder="possible answer..."
        onChange={(e) => props.handleQuestions(props.questionId, e.target)}
        className="resize-none p-4 focus:outline-none w-full h-full ml-auto rounded-md text-sm shadow-md placeholder:opacity-50"
      />
    </div>
  );
};

export default EditInputChoices;
