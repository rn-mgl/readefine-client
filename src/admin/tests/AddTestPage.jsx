import React from "react";

const AddTestPage = (props) => {
  return (
    <div className=" w-full cstm-flex-col gap-2">
      <div
        className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-screen justify-start items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar
            l-s:h-72"
      >
        <div className="cstm-flex-row w-full">
          <textarea
            name=""
            id=""
            cols="30"
            rows="1"
            className="resize-none p-2 focus:outline-none font-bold text-prmColor mr-auto"
            defaultValue={`${props.testNumber}.)`}
          ></textarea>
        </div>

        <div className="cstm-separator" />
        <div className="w-full h-full cstm-flex-col">
          <textarea
            name=""
            id=""
            cols="30"
            rows="1"
            className="resize-none p-2 focus:outline-none w-full h-full mr-auto"
            defaultValue="question..."
          ></textarea>
        </div>
      </div>
      <div className="w-full h-full cstm-flex-col gap-2">
        <div className="cstm-flex-row gap-2 w-full">
          <input type="radio" name="answer" id="" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="1"
            className="resize-none p-4 focus:outline-none w-full h-full ml-auto rounded-2xl text-sm shadow-md"
            defaultValue="choice 1"
          ></textarea>
        </div>
        <div className="cstm-flex-row gap-2 w-full">
          <input type="radio" name="answer" id="" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="1"
            className="resize-none p-4 focus:outline-none w-full h-full ml-auto rounded-2xl text-sm shadow-md"
            defaultValue="choice 2"
          ></textarea>
        </div>
        <div className="cstm-flex-row gap-2 w-full">
          <input type="radio" name="answer" id="" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="1"
            className="resize-none p-4 focus:outline-none w-full h-full ml-auto rounded-2xl text-sm shadow-md"
            defaultValue="choice 3"
          ></textarea>
        </div>
        <div className="cstm-flex-row gap-2 w-full">
          <input type="radio" name="answer" id="" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="1"
            className="resize-none p-4 focus:outline-none w-full h-full ml-auto rounded-2xl text-sm shadow-md"
            defaultValue="choice 4"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AddTestPage;
