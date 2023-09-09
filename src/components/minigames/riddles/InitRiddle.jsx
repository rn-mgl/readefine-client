import Link from "next/link";
import React from "react";
import { BsArrowLeft, BsPatchQuestionFill, BsQuestionCircle } from "react-icons/bs";

const InitRiddle = (props) => {
  const letters = "RIDDLES".split("").map((r, i) => {
    return (
      <div style={{ animationDelay: `${i / 5}s` }} key={i} className="animate-float ">
        <p
          style={{ animationDelay: `${i / 20}s` }}
          className="animate-slideDown font-extrabold text-4xl drop-shadow-md"
        >
          {r}
        </p>
      </div>
    );
  });

  return (
    <div className="w-full h-full cstm-w-limit cstm-flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 cstm-flex-col gap-2 z-10">
        <Link href={props.to} className="cstm-bg-hover ">
          <BsArrowLeft className="scale-125" />
        </Link>

        <button onClick={props.handleCanSeeTutorial} className="cstm-bg-hover">
          <BsQuestionCircle className="scale-125" />
        </button>
      </div>

      <div className="m-s:hidden t:flex absolute t:left-20 t:top-20 animate-[spin_10s_linear_infinite]">
        <BsPatchQuestionFill className="scale-[30] opacity-10" />
      </div>

      <div className="absolute bottom-0 t:right-20 t:bottom-20 animate-[spin_10s_linear_infinite]">
        <BsPatchQuestionFill className="scale-[30] opacity-10" />
      </div>

      <div className="cstm-flex-row gap-0.5 animate-fadeIn w-full">{letters}</div>

      <button
        onClick={() => {
          props.handleIsPlaying();
          props.getRiddle();
        }}
        className="animate-fadeIn bg-prmColor w-fit px-10 font-bold text-scndColor 
                rounded-full p-2 shadow-solid shadow-indigo-900 t:w-40 relative z-20"
      >
        Play
      </button>
    </div>
  );
};

export default InitRiddle;
