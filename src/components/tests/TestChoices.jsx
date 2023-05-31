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
      } rounded-md text-white text-left cstm-flex-row t:w-4/12 ${
        clicked ? props.shadowActive : props.shadow
      }`}
    >
      <span className="mr-auto">{props.choice}</span>
      <RiRecordCircleFill className={`${clicked ? "flex" : "hidden"} text-white`} />
    </button>
  );
};

export default TestChoices;
