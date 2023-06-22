import React from "react";
import { RiRecordCircleFill } from "react-icons/ri";

const TestChoices = (props) => {
  const clicked = props.selectedChoices[props.name].answer === props.choice;
  return (
    <button
      onClick={(e) => props.handleSelectedChoices(props.questionId, e.target)}
      value={props.choice}
      name={props.name}
      type="button"
      className={`w-full p-2 ${
        props.bgColor
      } rounded-md text-white text-left cstm-flex-row t:w-full t:h-44 l-s:h-52 relative ${
        clicked ? props.shadowActive : props.shadow
      }`}
    >
      {props.choice}
      <RiRecordCircleFill
        className={`${clicked ? "flex t:top-2 t:right-2" : "hidden"} text-white t:absolute`}
      />
    </button>
  );
};

export default TestChoices;
