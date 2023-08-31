import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import {
  BsDot,
  BsFillLightbulbFill,
  BsPatchQuestionFill,
  BsPlusSlashMinus,
} from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const DangleTutorial = (props) => {
  return (
    <div
      className="w-full fixed top-0 left-0 min-h-screen h-full backdrop-blur-md z-30 cstm-flex-col 
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
          <p className="font-extrabold text-prmColor text-xl t:text-2xl">
            HOW TO PLAY
          </p>

          <div
            className="cstm-flex-col h-auto bg-white rounded-2xl shadow-solid p-5 t:p-10  
                    w-full gap-5"
          >
            <div
              className="cstm-flex-col gap-5  bg-prmColor bg-opacity-10 p-5 rounded-md 
                    text-center relative w-full shadow-solid shadow-indigo-200"
            >
              <BsDot className="absolute scale-[4] text-scndColor top-0 left-0 -translate-x-1.5 -translate-y-1.5" />
              <p className="text-sm t:text-base">
                You will be given a random hidden word.
              </p>
              <BsPatchQuestionFill className="scale-150 text-prmColor" />
            </div>

            <div className="cstm-flex-col text-sm t:text-base w-full gap-5">
              <p className="mr-auto font-bold">Example</p>

              <div className="cstm-flex-col w-full gap-2">
                <div className="cstm-flex-row gap-2 w-full">
                  <p className="bg-black p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    P
                  </p>
                  <p className="bg-black p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    A
                  </p>
                  <p className="bg-black p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    P
                  </p>
                  <p className="bg-black p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    E
                  </p>
                  <p className="bg-black p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    R
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
                Your goal is to guess the word by trying out the letters.
              </p>
            </div>

            <div className="cstm-flex-col text-sm t:text-base w-full gap-5">
              <p className="mr-auto font-bold">Example</p>

              <div className="cstm-flex-col w-full gap-2 text-left">
                <p className="w-full">
                  If the letters you guessed are <b>not</b> in the word, the
                  color will not change.
                </p>
                <div className="cstm-flex-row gap-2 w-full">
                  <p className="bg-neutral-200 p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    T
                  </p>
                  <p className="bg-neutral-200 p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    R
                  </p>
                  <p className="bg-neutral-200 p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    U
                  </p>
                  <p className="bg-neutral-200 p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    S
                  </p>
                  <p className="bg-neutral-200 p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    T
                  </p>
                </div>
              </div>

              <div className="cstm-flex-col w-full gap-2 text-left">
                <p className="w-full">
                  If the letters you guessed are <b>in</b> the word, the font
                  color will change.
                </p>
                <div className="cstm-flex-row gap-2 w-full">
                  <p className="bg-neutral-200 p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    L
                  </p>
                  <p className="bg-neutral-200 p-2 w-8 h-8 rounded-md cstm-flex-col font-bold text-prmColor">
                    E
                  </p>
                  <p className="bg-neutral-200 p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    M
                  </p>
                  <p className="bg-neutral-200 p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    O
                  </p>
                  <p className="bg-neutral-200 p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    N
                  </p>
                </div>
              </div>

              <div className="cstm-flex-col w-full gap-2 text-left">
                <p className="w-full">
                  If the letters you guessed are in the <b>correct position</b>,
                  the font color and box color will change. The letter will also
                  show in the dangling box.
                </p>
                <div className="cstm-flex-row gap-2 w-full">
                  <p className="p-2 w-8 h-8 rounded-md cstm-flex-col font-bold bg-prmColor text-white">
                    P
                  </p>
                  <p className=" p-2 w-8 h-8 rounded-md cstm-flex-col font-bold bg-prmColor text-white">
                    A
                  </p>
                  <p className="bg-neutral-200 p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    I
                  </p>
                  <p className="bg-neutral-200 p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    N
                  </p>
                  <p className="bg-neutral-200 p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    T
                  </p>
                </div>

                <div className="cstm-flex-row gap-2 w-full">
                  <p className="bg-black p-2 w-8 h-8 rounded-md cstm-flex-col font-bold text-white">
                    P
                  </p>
                  <p className="bg-black p-2 w-8 h-8 rounded-md cstm-flex-col font-bold text-white">
                    A
                  </p>
                  <p className="bg-black p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    P
                  </p>
                  <p className="bg-black p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    E
                  </p>
                  <p className="bg-black p-2 w-8 h-8 rounded-md cstm-flex-col font-bold">
                    R
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
                You can also use the hint to see the definition of the word you
                are guessing.
              </p>
              <BsFillLightbulbFill className="text-prmColor" />
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
                There will be a timer that will record how long it takes you to
                guess the word.
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

export default DangleTutorial;
