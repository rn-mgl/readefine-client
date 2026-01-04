import { nanoid } from "nanoid";
import React from "react";
import { IoClose } from "react-icons/io5";

const DangleEntries = (props) => {
  const correctWord = props.correctWord;
  const entries = props.entryGuesses.map((entry, i) => {
    return (
      <div className="cstm-flex-row gap-2" key={i}>
        {entry.map((letter, j) => {
          const isCorrect = correctWord[j] === letter;
          const isIncluded = !isCorrect && correctWord.includes(letter);

          return (
            <p
              className={`${
                isCorrect
                  ? "bg-prmColor text-accntColor font-bold"
                  : "bg-neutral-200"
              } ${
                isIncluded && "text-prmColor underline underline-offset-2"
              } font-medium text-xs w-8 h-8 rounded-md cstm-flex-col bg`}
              key={nanoid()}
            >
              {letter}
            </p>
          );
        })}
      </div>
    );
  });
  return (
    <div className="absolute w-full top-2/4 -translate-y-24">
      <div className="cstm-flex-col w-full">
        <div className="cstm-flex-col rounded-md w-full gap-2 cstm-flex-col t:w-fit">
          {entries}
        </div>
      </div>
    </div>
  );
};

export default DangleEntries;
