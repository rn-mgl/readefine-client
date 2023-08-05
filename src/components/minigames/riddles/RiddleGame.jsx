import React from "react";
import Keyboard from "../Keyboard";
import RiddleInput from "./RiddleInput";

import {
  BsArrowLeft,
  BsPatchQuestionFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
} from "react-icons/bs";
import RiddleEntries from "./RiddleEntries";

const RiddleGame = (props) => {
  return (
    <div className="h-[95vh] cstm-flex-col relative w-full gap-5 cstm-w-limit">
      <div className="absolute top-10 left-0 cstm-flex-col gap-2 z-20 group l-s:top-0">
        <button className="cstm-bg-hover " onClick={props.handleMuteVolume}>
          {props.isMuted ? (
            <BsFillVolumeMuteFill className="scale-125" />
          ) : (
            <BsFillVolumeUpFill className="scale-125" />
          )}
        </button>

        <input
          onChange={(e) => props.handleVolume(e.target)}
          defaultValue={20}
          type="range"
          className="absolute bottom-0 rotate-90 translate-y-12  hidden group-hover:flex p-2"
        />
      </div>

      <div className="relative ml-auto cstm-flex-col gap-5">
        <button onClick={props.handleIsPlaying} className="cstm-bg-hover ml-auto">
          <BsArrowLeft className="scale-125" />
        </button>
        <div className="p-2 rounded-full border-2 border-prmColor w-8 h-8 cstm-flex-col">
          <p className="text-prmColor text-xs">{props.timer}</p>
        </div>
      </div>

      <div className="w-full cstm-flex-col mb-auto t:w-10/12 l-l:w-8/12">
        <div className="animate-[spin_60s_linear_infinite]">
          <BsPatchQuestionFill className="scale-[8] opacity-10 " />
        </div>

        <div className="cstm-flex-col gap-5 w-full rounded-2xl z-10 bg-white p-5 border-accntColor shadow-solid relative">
          <div className="cstm-flex-row gap-2">{props.remainingLives}</div>

          <p className=" font-bold text-center gap-2 text-prmColor animate-fadeIn">
            {props.riddleData.riddle}
          </p>

          <div className="cstm-separator" />

          <RiddleInput guess={props.guess} />
        </div>
      </div>

      {props.entryGuesses ? (
        <RiddleEntries setEntryGuesses={props.setEntryGuesses} entryGuesses={props.entryGuesses} />
      ) : null}

      <Keyboard
        submitGuess={props.submitGuess}
        handleInput={props.handleInput}
        gameOver={props.gameOver}
        deleteCharacter={props.deleteCharacter}
      />
    </div>
  );
};

export default RiddleGame;
