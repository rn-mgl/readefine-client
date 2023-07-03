import React from "react";

const DangleEntries = (props) => {
  const correctWord = props.correctWord;
  const entries = props.entryGuesses.map((entry, i) => {
    return (
      <div className="cstm-flex-row gap-2" key={i}>
        {entry.map((letter, j) => {
          const isCorrect = correctWord[j]?.letter === letter;
          const isIncluded = !isCorrect && correctWord.includes(letter);

          return (
            <p
              className={`${isCorrect && "bg-prmColor text-white font-bold"} ${
                isIncluded && "text-prmColor"
              } p-2 rounded-md text-xs w-8 h-8 text-center`}
              key={j}
            >
              {letter}
            </p>
          );
        })}
      </div>
    );
  });
  return <div className="absolute cstm-flex-col gap-2">{entries}</div>;
};

export default DangleEntries;
