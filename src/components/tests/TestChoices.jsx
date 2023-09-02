import React from "react";

const TestChoices = (props) => {
  const clicked = props.selectedChoices[props.name].answer === props.choice;

  return (
    <button
      onClick={(e) => props.handleSelectedChoices(props.questionId, e.target)}
      value={props.choice}
      name={props.name}
      type="button"
      className={`w-full p-5 ${
        props.bgColor
      } rounded-md text-white text-left cstm-flex-row t:w-full t:h-44 l-s:h-52 relative ${
        clicked
          ? `${props.shadowActive} border-8 border-double border-scndColor 
              t:-translate-y-4 transition-all`
          : props.shadow
      }`}
    >
      {props.choice}
    </button>
  );
};

export default TestChoices;
