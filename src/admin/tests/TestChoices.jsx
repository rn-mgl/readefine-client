import React from "react";
import { RiRecordCircleFill } from "react-icons/ri";

const TestChoices = (props) => {
  const clicked = props.selectedChoices[props.name].answer === props.choice;

  return (
    <button
      onClick={(e) =>
        props.handleSelectedChoices(props.questionId, e.target, console.log(e.target))
      }
      value={props.choice}
      name={props.name}
      type="button"
      className={`w-full p-2 ${
        props.bgColor
      } rounded-md text-white text-left cstm-flex-row t:w-5/12 t:h-28 relative ${
        clicked ? props.shadowActive : props.shadow
      }`}
    >
      {props.choice}
      <RiRecordCircleFill className={`${clicked ? "flex" : "hidden"} text-white w-8`} />
    </button>
  );
};

export default TestChoices;
