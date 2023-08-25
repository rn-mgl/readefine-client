import React from "react";

const GraphTypeChoice = (props) => {
  return (
    <div className="cstm-flex-row text-sm gap-5 w-full">
      <label htmlFor="lexile" className="mr-auto t:mr-0 cursor-pointer">
        <input
          type="radio"
          value="lexile"
          checked={props.quizVariable === "lexile"}
          name="lexile"
          id="lexile"
          className="hidden peer"
          onChange={(e) => props.handleQuizVariable(e.target)}
        />

        <div
          className="p-2 peer-checked:bg-prmColor peer-checked:text-white w-16 cstm-flex-col
            bg-accntColor rounded-md font-bold"
        >
          Lexile
        </div>
      </label>

      <label htmlFor="score" className="t:mr-auto cursor-pointer">
        <input
          type="radio"
          value="score"
          checked={props.quizVariable === "score"}
          name="score"
          id="score"
          className="hidden peer"
          onChange={(e) => props.handleQuizVariable(e.target)}
        />

        <div
          className="p-2 peer-checked:bg-prmColor peer-checked:text-white w-16 cstm-flex-col
            bg-accntColor rounded-md font-bold"
        >
          Score
        </div>
      </label>
    </div>
  );
};

export default GraphTypeChoice;