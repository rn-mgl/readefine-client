import React from "react";

const InputChoices = (props) => {
  const answerIdentifier = `answer${props.testNumber}`;
  return (
    <div className="cstm-flex-row gap-2 w-full">
      <label htmlFor={answerIdentifier + props.choiceValue}>
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
          className=" p-3.5 rounded-md bg-white transition-all font-light text-sm cursor-pointer
                    peer-checked:bg-prmColor peer-checked:text-scndColor peer-checked:font-semibold"
        >
          Answer
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
