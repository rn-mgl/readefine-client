import React from "react";
import { BsCheck } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const TestResult = (props) => {
  const mappedQuestions = props.questions?.map((q, i) => {
    const choice = props.selectedChoices[`choice${i + 1}`].answer;
    const isCorrect = choice === q.answer;
    return (
      <div
        className="p-4 bg-white rounded-2xl w-full h-full 
                cstm-flex-col gap-4 justify-start shadow-md animate-fadeIn"
        style={{ animationDuration: `${i * 0.1}s` }}
        key={q.question_id}
      >
        <div className="w-full h-44 overflow-y-auto cstm-scrollbar">
          <p className="font-semibold">{q.question}</p>
        </div>

        <div className="cstm-separator" />

        <div className="cstm-flex-col gap-3 w-full h-full t:cstm-flex-row t:flex-wrap">
          <div className="w-full h-full cstm-flex-col gap-4">
            <div
              className={`cstm-flex-col w-full gap-2 text-center t:w-full 
              rounded-md p-2 h-full ${isCorrect ? "bg-green-100" : "bg-red-100"}`}
            >
              <div className="cstm-flex-row gap-2  w-full ">
                <p className="font-bold text-prmColor">Your Answer</p>
                <div className={`${isCorrect ? "bg-prmColor" : "bg-scndColor"} rounded-full cstm-flex-col`}>
                  {isCorrect ? <BsCheck className="text-scndColor" /> : <IoClose className="text-prmColor " />}
                </div>
              </div>

              <p className={`${choice ? "opacity-100" : "opacity-50"}`}>{choice ? choice : "No Answer"}</p>
            </div>

            <div className="cstm-separator" />

            <div className="cstm-flex-col w-full gap-2 text-center t:w-full bg-prmColor p-2 rounded-md h-full">
              <p className="font-bold text-scndColor">Answer</p>
              <p className="text-accntColor">{q.answer}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div
      className="fixed w-full top-0 left-0 h-full backdrop-blur-md bg-gradient-to-br 
              from-[#552aca32] to-[#4bfce132] z-[60]
                p-4 cstm-flex-col justify-start overflow-y-auto cstm-scrollbar-2"
    >
      <div className="w-full h-auto  cstm-flex-col justify-start gap-4">
        <button onClick={props.handleCanSeeResult} className="cstm-bg-hover ml-auto">
          <IoClose className="text-prmColor text-xl" />
        </button>

        <div className="w-full h-full grid grid-cols-1 t:grid-cols-2 l-l:grid-cols-3 gap-4">{mappedQuestions}</div>
      </div>
    </div>
  );
};

export default TestResult;
