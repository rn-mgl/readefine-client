import React from "react";
import Keyboard from "../Keyboard";
import DangleInput from "./DangleInput";
import Dangling from "./Dangling";
import ActionLabel from "../../global/ActionLabel";
import DangleEntries from "./DangleEntries";

import {
  BsArrowLeft,
  BsFillLightbulbFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
} from "react-icons/bs";

const DangleGame = (props) => {
  const dangles = props.correctWord?.map((c, i) => {
    const latestEntry = props.entryGuesses?.at(-1);
    const isGuessed = latestEntry && latestEntry[i] === c;
    return (
      <React.Fragment key={i}>
        <Dangling
          character={c}
          isGuessed={isGuessed}
          isPlaying={props.isPlaying}
          gameOver={props.gameOver}
        />
      </React.Fragment>
    );
  });

  return (
    <div className="w-full h-[95vh] cstm-w-limit cstm-flex-col relative">
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

      <button
        className="cstm-bg-hover ml-auto absolute top-0 right-0"
        onClick={props.handleIsPlaying}
      >
        <BsArrowLeft className="text-black scale-125" />
      </button>

      <div className="cstm-flex-col gap-2 absolute right-0 top-12 t:gap-3">
        {props.remainingLives}

        <div className="cstm-flex-col mt-4">
          <div className="p-2 rounded-full border-2 border-prmColor w-8 h-8 cstm-flex-col">
            <p className="text-prmColor text-xs">{props.timer}</p>
          </div>

          <button onClick={props.handleCanSeeHint} className="cstm-bg-hover relative group">
            <ActionLabel label="Hint" />
            <BsFillLightbulbFill />
          </button>
        </div>
      </div>

      <div
        className={`${
          props.isPlaying ? "mb-auto" : "mb-0"
        } cstm-flex-row gap-2 absolute -top-52 t:gap-5`}
      >
        {dangles}
      </div>

      <DangleInput guess={props.guess} />

      <DangleEntries
        handleCanSeeEntries={props.handleCanSeeEntries}
        correctWord={props.correctWord}
        entryGuesses={props.entryGuesses}
      />

      <Keyboard
        submitGuess={props.submitGuess}
        deleteCharacter={props.deleteCharacter}
        handleInput={props.handleInput}
        gameOver={props.gameOver}
      />
    </div>
  );
};

export default DangleGame;
