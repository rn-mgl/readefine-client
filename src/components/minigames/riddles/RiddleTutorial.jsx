import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsDot, BsPatchQuestionFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const RiddleTutorial = (props) => {
  return (
    <div
      className="w-full fixed top-0 left-0 min-h-screen h-full backdrop-blur-md z-30 
                cstm-flex-col p-4 animate-[fadeIn_400ms] overflow-y-auto cstm-scrollbar-2"
    >
      <button className="cstm-bg-hover ml-auto absolute top-3 right-3" onClick={props.handleCanSeeTutorial}>
        <IoClose className="scale-125" />
      </button>

      <div className="cstm-w-limit cstm-flex-col w-full h-auto">
        <div className="cstm-flex-col w-full gap-4 t:w-10/12 l-l:w-8/12">
          <p className="font-extrabold text-prmColor text-xl t:text-2xl">HOW TO PLAY</p>

          <div className="cstm-flex-col bg-white rounded-2xl shadow-solid p-4 t:p-10 w-full gap-4">
            <div
              className="cstm-flex-col gap-4  bg-prmColor bg-opacity-10 p-4 rounded-md 
                    text-center relative w-full shadow-solid shadow-indigo-200"
            >
              <BsDot className="absolute scale-[4] text-scndColor top-0 left-0 -translate-x-1.5 -translate-y-1.5" />
              <p className="text-sm t:text-base">You will be given a riddle and your task is to guess it.</p>
              <BsPatchQuestionFill className="scale-125 text-prmColor" />
            </div>

            <div
              className="cstm-flex-col gap-4 bg-prmColor bg-opacity-10 p-4 rounded-md 
                    text-center relative  w-full shadow-solid shadow-indigo-200"
            >
              <BsDot className="absolute scale-[4] text-scndColor top-0 left-0 -translate-x-1.5 -translate-y-1.5" />
              <p className="text-sm t:text-base">Try to guess the answer before using up your lives.</p>
              <div className="cstm-flex-row gap-2 w-full text-prmColor">
                <AiFillHeart />
                <AiFillHeart />
                <AiFillHeart />
                <AiFillHeart />
                <AiFillHeart />
              </div>
            </div>

            <div
              className="cstm-flex-col gap-4  bg-prmColor bg-opacity-10 p-4 rounded-md 
                    text-center relative w-full shadow-solid shadow-indigo-200"
            >
              <BsDot className="absolute scale-[4] text-scndColor top-0 left-0 -translate-x-1.5 -translate-y-1.5" />
              <p className="text-sm t:text-base">
                There will be a timer that will record how long it takes you to answer the riddle.
              </p>
              <div className="p-2 rounded-full border-2 border-prmColor w-7 h-7 cstm-flex-col">
                <p className="text-prmColor text-xs">2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiddleTutorial;
