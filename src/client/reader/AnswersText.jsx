import React from "react";

const AnswersText = (props) => {
  return (
    <div className="cstm-flex-col gap-5 w-full bg-scndColor p-5 rounded-2xl items-start text-left bg-opacity-20 text-sm">
      {props.question ? (
        <>
          <p>
            <span className="font-semibold">Question:</span> {props.question}
          </p>
          <div className="cstm-separator" />
        </>
      ) : null}

      {props.duration ? (
        <>
          <p>
            <span className="font-semibold">Duration:</span> {props.duration} Seconds
          </p>
          <div className="cstm-separator" />
        </>
      ) : null}

      <p>
        <span className="font-semibold text-cyan-900">You:</span> {props.myAnswer}
      </p>
      <div className="cstm-separator" />
      <p>
        <span className="font-semibold text-prmColor">Correct:</span> {props.correctAnswer}
      </p>
    </div>
  );
};

export default AnswersText;
