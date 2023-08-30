import Link from "next/link";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";

const TestActions = (props) => {
  return (
    <div className="cstm-flex-row w-full">
      <Link href="/archives/tests" className="cstm-bg-hover mr-auto">
        <BsArrowLeft className="text-prmColor" />
      </Link>

      {/* show submit button if at last page and did not submit yet */}
      {props.activePage === 9 && !props.hasSubmitted ? (
        <button
          onClick={props.submitAnswers}
          disabled={props.hasSubmitted}
          className="bg-prmColor w-fit ml-auto p-2 px-10  text-sm rounded-full cstm-flex-col 
                font-medium text-scndColor shadow-solid shadow-indigo-950 disabled:saturate-0"
        >
          Submit
        </button>
      ) : null}
    </div>
  );
};

export default TestActions;
