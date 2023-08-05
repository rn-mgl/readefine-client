import React from "react";
import { BsArrowLeft, BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import DecipherLetterBlock from "./DecipherLetterBlock";

const DecipherGame = (props) => {
  const letterBlocks = props.guess?.map((cipher, i) => {
    return (
      <React.Fragment key={i}>
        <DecipherLetterBlock
          incrementLetter={() => props.incrementLetter(i)}
          decrementLetter={() => props.decrementLetter(i)}
          letter={cipher.letter}
          skips={cipher.skips}
        />
      </React.Fragment>
    );
  });

  return (
    <div className="w-full cstm-w-limit cstm-flex-col h-[95vh] relative">
      <div className="absolute top-10 left-0 cstm-flex-col gap-2 z-10 group l-s:top-0">
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
          className="absolute bottom-0 rotate-90 translate-y-12 hidden group-hover:flex p-2"
        />
      </div>

      <div className="absolute top-0 right-0 cstm-flex-col gap-5">
        <button onClick={props.handleIsPlaying} className="cstm-bg-hover ml-auto">
          <BsArrowLeft />
        </button>
        <div className="cstm-flex-col gap-2"> {props.remainingLives}</div>
        <div className="p-2 rounded-full border-2 border-prmColor w-8 h-8 cstm-flex-col">
          <p className="text-prmColor text-xs">{props.timer}</p>
        </div>
      </div>

      <div className="cstm-flex-row my-auto m-l:gap-2 t:gap-5">{letterBlocks}</div>
      <div className="cstm-flex-row w-full ">
        <button
          onClick={props.resetGuesses}
          className="cstm-flex-row gap-2 border-2 mr-auto border-prmColor text-sm text-prmColor p-2 w-fit px-10 rounded-full t:w-40 font-bold"
        >
          Reset
        </button>

        <button
          onClick={props.submitGuess}
          disabled={props.gameOver.over}
          className="cstm-flex-row gap-2 border-2 border-prmColor bg-prmColor text-sm 
                    text-scndColor p-2 w-fit px-10 rounded-full t:w-40 font-bold
                    disabled:saturate-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DecipherGame;
