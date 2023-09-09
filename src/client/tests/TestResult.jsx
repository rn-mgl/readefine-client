import React from "react";
import { BsCheck } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const TestResult = (props) => {
  const mappedQuestions = props.questions?.map((q, i) => {
    const choice = props.selectedChoices[`choice${i + 1}`].answer;
    const isCorrect = choice === q.answer;
    return (
      <div
        className="p-5 bg-white rounded-md w-full cstm-flex-col gap-5 items-start t:w-10/12 l-l:w-8/12 shadow-md"
        key={q.question_id}
      >
        <p className="font-bold">{q.question}</p>
        <div className="cstm-separator" />
        <div className="cstm-flex-col gap-3 w-full t:cstm-flex-row t:flex-wrap">
          <div className="w-full h-full cstm-flex-col gap-5 t:cstm-flex-row">
            <div className="cstm-flex-col w-full gap-2 text-center t:w-full bg-accntColor rounded-md p-2 h-full">
              <div className="font-bold text-prmColor cstm-flex-row gap-2">
                Your Answer
                {isCorrect ? (
                  <div className="cstm-flex-col rounded-full bg-prmColor ">
                    <BsCheck className="text-scndColor" />
                  </div>
                ) : (
                  <div className="cstm-flex-col rounded-full bg-scndColor">
                    <IoClose className="text-prmColor" />
                  </div>
                )}
              </div>
              <p className={`${choice ? "opacity-100" : "opacity-50"}`}>{choice ? choice : "No Answer"}</p>
            </div>
            <div className="cstm-separator t:hidden" />
            <div className="cstm-flex-col w-full gap-2 text-center t:w-full bg-prmColor p-2 rounded-md h-full">
              <p className="font-bold text-scndColor">Answer</p>
              <p className="text-white">{q.answer}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div
      className="fixed w-full top-0 left-0 h-full backdrop-blur-md 
                  z-30 p-5 cstm-flex-col justify-start overflow-y-auto cstm-scrollbar-2"
    >
      <div className="w-full h-auto cstm-w-limit cstm-flex-col justify-start gap-5">
        <button onClick={props.handleCanSeeResult} className="cstm-bg-hover ml-auto">
          <IoClose className="text-prmColor scale-150" />
        </button>

        {mappedQuestions}
      </div>
    </div>
  );
};

export default TestResult;
