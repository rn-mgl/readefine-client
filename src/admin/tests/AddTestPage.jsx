import React from "react";
import InputChoices from "./InputChoices";
import { IoClose } from "react-icons/io5";

const AddTestPage = (props) => {
  const answerValue = props.page[`answer${props.testNumber}`];
  return (
    <div
      className=" w-full h-full cstm-flex-col gap-2 fixed animate-fadeIn
                  top-0 left-0 bg-prmColor bg-opacity-10 backdrop-blur-md z-20 p-4"
    >
      <div className="w-full h-full cstm-flex-col gap-2 cstm-w-limit">
        <button onClick={props.handleSelectedCard} className="cstm-bg-hover ml-auto">
          <IoClose className="text-prmColor scale-125" />
        </button>

        <div className="w-full h-full cstm-flex-col gap-2 l-s:w-10/12">
          <div
            className="table-fixed p-4 rounded-2xl cstm-flex-col overflow-auto w-full h-full justify-start 
                  items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar-2"
          >
            <p className="resize-none p-2 focus:outline-none font-bold text-prmColor mr-auto">{`${props.testNumber}.)`}</p>

            <div className="cstm-separator" />

            <div className="w-full h-full cstm-flex-col">
              <textarea
                name="testQuestion"
                id="testQuestion"
                cols="30"
                rows="1"
                onChange={(e) => props.handlePages(props.testNumber, e.target)}
                value={props.page.testQuestion}
                required={true}
                placeholder="question..."
                className="resize-none p-2 focus:outline-none w-full h-full mr-auto placeholder:opacity-50"
              />
            </div>
          </div>

          <div className="w-full cstm-flex-col gap-2">
            <InputChoices
              checked={answerValue === props.page.choice1}
              choiceValue={props.page.choice1}
              handlePages={props.handlePages}
              testNumber={props.testNumber}
              name="choice1"
            />

            <InputChoices
              checked={answerValue === props.page.choice2}
              choiceValue={props.page.choice2}
              handlePages={props.handlePages}
              testNumber={props.testNumber}
              name="choice2"
            />

            <InputChoices
              checked={answerValue === props.page.choice3}
              choiceValue={props.page.choice3}
              handlePages={props.handlePages}
              testNumber={props.testNumber}
              name="choice3"
            />

            <InputChoices
              checked={answerValue === props.page.choice4}
              choiceValue={props.page.choice4}
              handlePages={props.handlePages}
              testNumber={props.testNumber}
              name="choice4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTestPage;
