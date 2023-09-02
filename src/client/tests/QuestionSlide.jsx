import React from "react";
import { choicesStyle } from "../../functions/testFns";
import TestChoices from "../../components/tests/TestChoices";

const QuestionSlide = (props) => {
  const active = props.index === props.activePage;
  let position = "translate-x-full opacity-0";

  if (active) {
    position = "translate-x-0";
  }

  if (props.index === props.activePage - 1) {
    position = "-translate-x-full opacity-0";
  }

  const mappedChoices = [1, 2, 3, 4].map((choiceNumber) => {
    const currChoice = props["choice" + choiceNumber];

    return (
      <React.Fragment key={choiceNumber}>
        <TestChoices
          bgColor={choicesStyle[choiceNumber].bgColor}
          shadow={choicesStyle[choiceNumber].shadow}
          shadowActive={choicesStyle[choiceNumber].shadowActive}
          choice={currChoice}
          name={props.name}
          selectedChoices={props.selectedChoices}
          questionId={props.questionId}
          handleSelectedChoices={props.handleSelectedChoices}
        />
      </React.Fragment>
    );
  });

  return (
    <div
      className={`${position} transition-all bg-white p-5 rounded-md cstm-flex-col gap-5 
                absolute w-full h-full justify-start overflow-y-auto`}
    >
      <p className="font-bold text-prmColor mr-auto">{props.index + 1}.</p>
      <p className="font-bold t:text-lg my-auto">{props.question}</p>

      <div className="cstm-flex-col gap-3 w-full t:cstm-flex-row">{mappedChoices}</div>
    </div>
  );
};

export default QuestionSlide;
