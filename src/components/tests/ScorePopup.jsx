"use client";
import Link from "next/link";
import React from "react";
import Confetti from "react-confetti";
import { IoClose } from "react-icons/io5";

const ScorePopup = (props) => {
  const score = props.score;
  const passed = score > 7;
  const message = passed ? "You understood that very well!" : "Don't worry, try reading it and answer once again!";
  const background = passed
    ? "bg-gradient-to-b from-prmColor to-scndColor "
    : "bg-gradient-to-b from-prmColor to-indigo-950";

  const buttonAction = props.url ? (
    <Link href={props.url} className="p-2 hover:bg-black hover:bg-opacity-10 rounded-full w-fit ml-auto ">
      <IoClose className="scale-150 text-white" />
    </Link>
  ) : (
    <button
      onClick={props.handleIsFinished}
      className="p-2 hover:bg-black hover:bg-opacity-10 rounded-full w-fit ml-auto "
    >
      <IoClose className="scale-150 text-white" />
    </button>
  );

  return (
    <div className="fixed top-0 left-0 w-full h-screen backdrop-blur-md z-20">
      {passed ? <Confetti width={window.innerWidth} height={window.innerHeight} /> : null}
      <div className="w-full h-full relative">
        <div
          className={`w-full h-3/6 p-5 pb-12 cstm-flex-col ${background} absolute gap-2 animate-slideDown top-0 right-0 shadow-md cstm-w-limit`}
        >
          {buttonAction}
          <div className="my-auto text-white text-center cstm-flex-col gap-2">
            <p className="text-sm font-extralight">you got</p>
            <p className="text-6xl font-bold">{score}</p>
            <p className="font-light">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorePopup;
