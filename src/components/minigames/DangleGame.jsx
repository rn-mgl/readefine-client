import React from "react";
import { BsFillPauseFill } from "react-icons/bs";
import Keyboard from "./Keyboard";
import DangleInput from "./DangleInput";
import Dangling from "./Dangling";
import DangleEntries from "./DangleEntries";

const DangleGame = (props) => {
  const dangles = props.correctWord?.map((c, i) => {
    const latestEntry = props.entryGuesses?.at(-1);
    const isGuessed = latestEntry && latestEntry[i] === c;
    return (
      <React.Fragment key={i}>
        <Dangling character={c} isGuessed={isGuessed} />
      </React.Fragment>
    );
  });

  return (
    <div className="w-full h-[95vh] cstm-w-limit cstm-flex-col relative">
      <button
        className="cstm-bg-hover ml-auto absolute top-0 right-0"
        onClick={props.handleIsPlaying}
      >
        <BsFillPauseFill className="text-black scale-100 m-l:scale-150" />
      </button>

      <div className="cstm-flex-col gap-2 absolute right-2.5 top-10 t:gap-3">
        {props.remainingLives}
      </div>

      <div
        className={`${
          props.isPlaying ? "mb-auto" : "mb-0"
        } cstm-flex-row gap-2 absolute -top-52 t:gap-5`}
      >
        {dangles}
      </div>

      <DangleInput guess={props.guess} />

      {props.entryGuesses ? (
        <DangleEntries correctWord={props.correctWord} entryGuesses={props.entryGuesses} />
      ) : null}

      <Keyboard
        submitGuess={props.submitGuess}
        deleteCharacter={props.deleteCharacter}
        handleInput={props.handleInput}
      />
    </div>
  );
};

export default DangleGame;
