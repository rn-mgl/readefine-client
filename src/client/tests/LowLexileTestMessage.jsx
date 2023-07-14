import React from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

const LowLexileTestMessage = (props) => {
  return (
    <div className="w-full h-screen backdrop-blur-md fixed top-0 left-0 z-10 p-5">
      <div className="cstm-flex-col w-full h-full cstm-w-limit">
        <div className="bg-white rounded-2xl shadow-md w-full h-fit p-5 cstm-flex-col gap-5 text-justify text-sm relative t:w-6/12 l-s:w-5/12">
          <button
            onClick={props.handleShowLexileMessage}
            className="cstm-bg-hover ml-auto absolute top-3 right-3"
          >
            <IoClose className="scale-110" />
          </button>
          <p className="text-prmColor font-bold underline underline-offset-2 text-base">
            Important
          </p>
          <div className="cstm-separator" />
          <p>
            Your Lexile Level will <b className="text-prmColor">not change</b> for answering tests{" "}
            <b className="text-prmColor">lower</b> than your minimum level,{" "}
            <b className="text-prmColor">{props.userLexile - 100}L</b>.
          </p>

          <p>
            You can <b className="text-prmColor">lower your current grade level</b> in your profile
            if you think your current Lexile level is{" "}
            <b className="text-prmColor">too challenging for now.</b>
          </p>

          <p className="text-sm italic text-center">{`“Growth begins when we begin to accept our own weakness.” – Jean Vanier`}</p>
          <Link
            href={props.testLink}
            className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2"
          >
            Proceed to Test
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LowLexileTestMessage;
