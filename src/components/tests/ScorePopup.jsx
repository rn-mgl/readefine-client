"use client";
import React from "react";
import Confetti from "react-confetti";
import { IoClose } from "react-icons/io5";

const ScorePopup = (props) => {
  const score = props.score;
  const passed = score > 7;
  const message = passed ? "You're a great reader!" : "Continue reading more!";
  const background = passed
    ? "bg-gradient-to-b from-prmColor to-scndColor "
    : "bg-gradient-to-b from-prmColor to-indigo-950";

  return (
    <div className="fixed top-0 left-0 w-full h-screen backdrop-blur-md z-20">
      {passed ? <Confetti width={window.innerWidth} height={window.innerHeight} /> : null}
      <div
        className={`w-full h-2/6 p-5 pb-12 cstm-flex-col ${background} 
                 shadow-md l-s:w-[70%] l-s:ml-auto
                  l-l:w-[80%]`}
      >
        <div className="p-2 hover:bg-black hover:bg-opacity-10 rounded-full w-fit ml-auto ">
          <IoClose
            className="cursor-pointer scale-150 text-white"
            onClick={props.handleIsFinished}
          />
        </div>
        <div className="my-auto text-white text-center cstm-flex-col gap-2">
          <p className="text-sm font-extralight">you got</p>
          <p className="text-6xl font-bold">{score}</p>
          <p className="font-light">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ScorePopup;
