import React from "react";
import EditInputChoices from "./EditInputChoices";
import { IoClose } from "react-icons/io5";

const EditTestPage = (props) => {
  const questionIndex = props.questions.findIndex((q) => q.question_id === props.selectedCard);
  const question = props.questions[questionIndex];
  const answerValue = question[`answer${question.question_id}`];

  return (
    <div
      className=" w-full h-full cstm-flex-col gap-2 fixed animate-fadeIn
                  top-0 left-0 bg-prmColor bg-opacity-10 backdrop-blur-md z-[60] p-4"
    >
      <div className="w-full h-full cstm-flex-col gap-2 ">
        <button onClick={() => props.handleSelectedCard(question.question_id)} className="cstm-bg-hover ml-auto">
          <IoClose className="text-prmColor text-xl" />
        </button>

        <div className="w-full h-full cstm-flex-col gap-2 l-s:w-10/12">
          <div
            className="table-fixed p-4 rounded-2xl cstm-flex-col overflow-auto w-full h-full justify-start 
                  items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar-2"
          >
            <p className="resize-none p-2 focus:outline-none font-bold text-prmColor mr-auto">Question</p>

            <div className="cstm-separator" />

            <div className="w-full h-full cstm-flex-col">
              <textarea
                name="question"
                id="question"
                cols="30"
                rows="1"
                required={true}
                onChange={(e) => props.handleQuestions(question.question_id, e.target)}
                value={question.question}
                placeholder="question..."
                className="resize-none p-2 focus:outline-none w-full h-full mr-auto placeholder:opacity-50"
              />
            </div>
          </div>

          <div className="w-full cstm-flex-col gap-2">
            <EditInputChoices
              checked={answerValue === question.choice_1}
              choiceValue={question.choice_1}
              handleQuestions={props.handleQuestions}
              questionId={question.question_id}
              name="choice_1"
            />
            <EditInputChoices
              checked={answerValue === question.choice_2}
              choiceValue={question.choice_2}
              handleQuestions={props.handleQuestions}
              questionId={question.question_id}
              name="choice_2"
            />
            <EditInputChoices
              checked={answerValue === question.choice_3}
              choiceValue={question.choice_3}
              handleQuestions={props.handleQuestions}
              questionId={question.question_id}
              name="choice_3"
            />
            <EditInputChoices
              checked={answerValue === question.choice_4}
              choiceValue={question.choice_4}
              handleQuestions={props.handleQuestions}
              questionId={question.question_id}
              name="choice_4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTestPage;
