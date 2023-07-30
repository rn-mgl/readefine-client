import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { BsDot, BsPatchQuestionFill, BsPlusSlashMinus } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const DecipherTutorial = (props) => {
  return (
    <div
      className="w-full fixed top-0 left-0 min-h-screen h-full backdrop-blur-md z-20 cstm-flex-col 
                  justify-start p-5 animate-[fadeIn_200ms] overflow-y-auto cstm-scrollbar-2"
    >
      <button
        className="cstm-bg-hover ml-auto absolute top-3 right-3"
        onClick={props.handleCanSeeTutorial}
      >
        <IoClose className="scale-150" />
      </button>

      <div className="cstm-w-limit cstm-flex-col w-full h-auto">
        <div className="cstm-flex-col justify-start w-full gap-5 t:w-10/12 l-l:w-8/12 ">
          <p className="font-extrabold text-prmColor text-xl t:text-2xl">HOW TO PLAY</p>

          <div
            className="cstm-flex-col h-auto bg-white rounded-2xl shadow-solid p-5 t:p-10  
                    w-full gap-5"
          >
            <div
              className="cstm-flex-col gap-5  bg-prmColor bg-opacity-10 p-5 rounded-md 
                    text-center relative w-full shadow-solid shadow-indigo-200"
            >
              <BsDot className="absolute scale-[4] text-scndColor top-0 left-0 -translate-x-1.5 -translate-y-1.5" />
              <p className="text-sm t:text-base">You will be given a word with shuffled letters.</p>
              <BsPatchQuestionFill className="scale-150 text-prmColor" />
            </div>

            <div className="cstm-flex-col text-sm w-full gap-5">
              <p className="mr-auto font-bold">Example</p>

              <div className="cstm-flex-col w-full gap-2">
                <div className="cstm-flex-row gap-2 w-full">
                  <p className="bg-prmColor p-2 w-8 h-8 rounded-md bg-opacity-10 cstm-flex-col font-bold text-prmColor">
                    P
                  </p>
                  <p className="bg-prmColor p-2 w-8 h-8 rounded-md bg-opacity-10 cstm-flex-col font-bold text-prmColor">
                    A
                  </p>
                  <p className="bg-prmColor p-2 w-8 h-8 rounded-md bg-opacity-10 cstm-flex-col font-bold text-prmColor">
                    P
                  </p>
                  <p className="bg-prmColor p-2 w-8 h-8 rounded-md bg-opacity-10 cstm-flex-col font-bold text-prmColor">
                    E
                  </p>
                  <p className="bg-prmColor p-2 w-8 h-8 rounded-md bg-opacity-10 cstm-flex-col font-bold text-prmColor">
                    R
                  </p>
                </div>

                <BiChevronDown className="scale-150" />

                <div className="cstm-flex-row gap-2 w-full">
                  <p className="bg-prmColor p-2 w-8 h-8 rounded-md bg-opacity-10 cstm-flex-col font-bold text-prmColor">
                    Q
                  </p>
                  <p className="bg-prmColor p-2 w-8 h-8 rounded-md bg-opacity-10 cstm-flex-col font-bold text-prmColor">
                    X
                  </p>
                  <p className="bg-prmColor p-2 w-8 h-8 rounded-md bg-opacity-10 cstm-flex-col font-bold text-prmColor">
                    B
                  </p>
                  <p className="bg-prmColor p-2 w-8 h-8 rounded-md bg-opacity-10 cstm-flex-col font-bold text-prmColor">
                    R
                  </p>
                  <p className="bg-prmColor p-2 w-8 h-8 rounded-md bg-opacity-10 cstm-flex-col font-bold text-prmColor">
                    M
                  </p>
                </div>
              </div>
            </div>

            <div
              className="cstm-flex-col gap-5  bg-prmColor bg-opacity-10 p-5 rounded-md 
                    text-center relative w-full shadow-solid shadow-indigo-200"
            >
              <BsDot className="absolute scale-[4] text-scndColor top-0 left-0 -translate-x-1.5 -translate-y-1.5" />
              <p className="text-sm t:text-base">
                Your goal is to guess the correct letters by using the skips clue on each letter.
              </p>
              <div className="cstm-flex-row gap-2 w-full">
                <div className="cstm-flex-row font-medium text-xs text-black bg-white rounded-md w-8 h-8 cstm-flex-col gap-1">
                  <BsPlusSlashMinus />
                  <p>2</p>
                </div>

                <div className="cstm-flex-row font-medium text-xs text-black bg-white rounded-md w-8 h-8 cstm-flex-col gap-1">
                  <BsPlusSlashMinus />
                  <p>8</p>
                </div>

                <div className="cstm-flex-row font-medium text-xs text-black bg-white rounded-md w-8 h-8 cstm-flex-col gap-1">
                  <BsPlusSlashMinus />
                  <p>5</p>
                </div>

                <div className="cstm-flex-row font-medium text-xs text-black bg-white rounded-md w-8 h-8 cstm-flex-col gap-1">
                  <BsPlusSlashMinus />
                  <p>12</p>
                </div>

                <div className="cstm-flex-row font-medium text-xs text-black bg-white rounded-md w-8 h-8 cstm-flex-col gap-1">
                  <BsPlusSlashMinus />
                  <p>3</p>
                </div>
              </div>
            </div>

            <div
              className="cstm-flex-col gap-5 bg-prmColor bg-opacity-10 p-5 rounded-md 
                    text-center relative  w-full shadow-solid shadow-indigo-200"
            >
              <BsDot className="absolute scale-[4] text-scndColor top-0 left-0 -translate-x-1.5 -translate-y-1.5" />
              <p className="text-sm t:text-base">
                Try to guess the answer before using up your lives.
              </p>
              <div className="cstm-flex-row gap-2 w-full text-prmColor">
                <AiFillHeart />
                <AiFillHeart />
                <AiFillHeart />
                <AiFillHeart />
                <AiFillHeart />
              </div>
            </div>

            <div
              className="cstm-flex-col gap-5  bg-prmColor bg-opacity-10 p-5 rounded-md 
                    text-center relative w-full shadow-solid shadow-indigo-200"
            >
              <BsDot className="absolute scale-[4] text-scndColor top-0 left-0 -translate-x-1.5 -translate-y-1.5" />
              <p className="text-sm t:text-base">
                There will be a timer that will record how long it takes you to guess the word.
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

export default DecipherTutorial;
