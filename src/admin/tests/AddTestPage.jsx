import React from "react";
import InputChoices from "./InputChoices";
import { AiFillDelete } from "react-icons/ai";

const AddTestPage = (props) => {
  const answerValue = props.page[`answer${props.testNumber}`];
  return (
    <div className=" w-full cstm-flex-col gap-2">
      <div
        className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-screen justify-start items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar
            t:h-96 l-s:h-72"
      >
        <p className="resize-none p-2 focus:outline-none font-bold text-prmColor mr-auto">
          {`${props.testNumber}.)`}
        </p>

        <div className="cstm-separator" />
        <div className="w-full h-full cstm-flex-col">
          <textarea
            name="testQuestion"
            id="testQuestion"
            cols="30"
            rows="1"
            onChange={(e) => props.handlePages(props.testNumber, e.target)}
            value={props.page.testQuestion}
            placeholder="question..."
            className="resize-none p-2 focus:outline-none w-full h-full mr-auto placeholder:opacity-50"
          ></textarea>
        </div>
      </div>
      <div className="w-full h-full cstm-flex-col gap-2">
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
  );
};

export default AddTestPage;
