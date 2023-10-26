import React from "react";
import EditInputChoices from "./EditInputChoices";

const EditTestPage = (props) => {
  const answerValue = props.question[`answer${props.questionId}`];
  return (
    <div className=" w-full cstm-flex-col gap-2">
      <div
        className="table-fixed p-4 rounded-2xl cstm-flex-col overflow-auto w-full h-screen justify-start 
                  items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar-2
            t:h-96 l-s:h-72"
      >
        <p className="resize-none p-2 focus:outline-none font-bold text-prmColor mr-auto">{`${props.testNumber}.)`}</p>

        <div className="cstm-separator" />

        <div className="w-full h-full cstm-flex-col">
          <textarea
            name="question"
            id="question"
            cols="30"
            rows="1"
            required={true}
            onChange={(e) => props.handleQuestions(props.questionId, e.target)}
            value={props.question.question}
            placeholder="question..."
            className="resize-none p-2 focus:outline-none w-full h-full mr-auto placeholder:opacity-50"
          />
        </div>
      </div>

      <div className="w-full h-full cstm-flex-col gap-2">
        <EditInputChoices
          checked={answerValue === props.question.choice_1}
          choiceValue={props.question.choice_1}
          handleQuestions={props.handleQuestions}
          questionId={props.questionId}
          name="choice_1"
        />
        <EditInputChoices
          checked={answerValue === props.question.choice_2}
          choiceValue={props.question.choice_2}
          handleQuestions={props.handleQuestions}
          questionId={props.questionId}
          name="choice_2"
        />
        <EditInputChoices
          checked={answerValue === props.question.choice_3}
          choiceValue={props.question.choice_3}
          handleQuestions={props.handleQuestions}
          questionId={props.questionId}
          name="choice_3"
        />
        <EditInputChoices
          checked={answerValue === props.question.choice_4}
          choiceValue={props.question.choice_4}
          handleQuestions={props.handleQuestions}
          questionId={props.questionId}
          name="choice_4"
        />
      </div>
    </div>
  );
};

export default EditTestPage;
