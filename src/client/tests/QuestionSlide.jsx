import React from "react";
import TestChoices from "../../client/tests/TestChoices";

const QuestionSlide = (props) => {
  const active = props.index === props.activePage;
  let position = "translate-x-full opacity-0";

  if (active) {
    position = "translate-x-0";
  }

  if (props.index === props.activePage - 1) {
    position = "-translate-x-full opacity-0";
  }

  return (
    <div
      className={`${position} transition-all bg-white p-5 pt-14 rounded-md cstm-flex-col gap-5 absolute top-10 w-full h-full justify-start overflow-y-auto
                t:cstm-flex-row t:flex-wrap `}
    >
      <p className="mb-auto absolute top-5 left-5 font-bold text-prmColor">{props.index + 1}.</p>
      <p className="font-bold text-justify mt-auto t:text-lg mx-auto">{props.question}</p>

      <div className="cstm-flex-col gap-3 w-full t:cstm-flex-row mt-auto">
        <TestChoices
          bgColor="bg-indigo-300"
          shadow="shadow-[0_4px_rgba(129,140,248,1)]"
          shadowActive="shadow-[inset_0_4px_rgba(129,140,248,1)]"
          choice={props.choice1}
          name={"choice" + (props.index + 1)}
          selectedChoices={props.selectedChoices}
          handleSelectedChoices={props.handleSelectedChoices}
          questionId={props.questionId}
        />
        <TestChoices
          bgColor="bg-indigo-500"
          shadow="shadow-[0_4px_rgba(79,70,229,1)]"
          shadowActive="shadow-[inset_0_4px_rgba(79,70,229,1)]"
          choice={props.choice2}
          name={"choice" + (props.index + 1)}
          selectedChoices={props.selectedChoices}
          handleSelectedChoices={props.handleSelectedChoices}
          questionId={props.questionId}
        />
        <TestChoices
          bgColor="bg-indigo-700"
          shadow="shadow-[0_4px_rgba(55,48,163,1)]"
          shadowActive="shadow-[inset_0_4px_rgba(55,48,163,1)]"
          choice={props.choice3}
          name={"choice" + (props.index + 1)}
          selectedChoices={props.selectedChoices}
          handleSelectedChoices={props.handleSelectedChoices}
          questionId={props.questionId}
        />
        <TestChoices
          bgColor="bg-indigo-900"
          shadow="shadow-[0_4px_rgba(25,22,75,1)]"
          shadowActive="shadow-[inset_0_4px_rgba(25,22,75,1)]"
          choice={props.choice4}
          name={"choice" + (props.index + 1)}
          selectedChoices={props.selectedChoices}
          handleSelectedChoices={props.handleSelectedChoices}
          questionId={props.questionId}
        />
      </div>
    </div>
  );
};

export default QuestionSlide;
