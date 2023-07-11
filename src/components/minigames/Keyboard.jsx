"use client";
import React from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { BsBackspaceFill } from "react-icons/bs";

const Keyboard = (props) => {
  const line1 = React.useMemo(() => ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], []);
  const line2 = React.useMemo(() => ["A", "S", "D", "F", "G", "H", "J", "K", "L"], []);
  const line3 = React.useMemo(() => ["Z", "X", "C", "V", "B", "N", "M"], []);
  const gameOver = props.gameOver?.over;

  const qwertyMap = line1.map((c) => {
    return (
      <button
        disabled={gameOver}
        tabIndex={-1}
        onClick={() => props.handleInput(c)}
        className="bg-prmColor bg-opacity-20 p-2 cstm-flex-col rounded-md text-xs text-prmColor font-bold shadow-solid shadow-indigo-400 h-9 min-w-[1.65rem] text-center 
                 m-l:text-sm m-l:w-8 
                t:text-base t:w-14 t:h-10 
                hover:shadow-solid hover:shadow-indigo-400 hover:bg-opacity-10 transition-all
                disabled:bg-neutral-400 disabled:shadow-neutral-700 disabled:text-white"
        value={c}
        key={c}
      >
        {c}
      </button>
    );
  });

  const asdfMap = line2.map((c) => {
    return (
      <button
        disabled={gameOver}
        tabIndex={-1}
        onClick={() => props.handleInput(c)}
        className="bg-prmColor bg-opacity-20 p-2 cstm-flex-col rounded-md text-xs text-prmColor font-bold shadow-solid shadow-indigo-400 h-9 min-w-[1.65rem] text-center 
                    m-l:text-sm m-l:w-8
                    t:text-base t:w-14 t:h-10 
                    hover:shadow-solid hover:shadow-indigo-400 hover:bg-opacity-10 transition-all
                    disabled:bg-neutral-400 disabled:shadow-neutral-700 disabled:text-white"
        value={c}
        key={c}
      >
        {c}
      </button>
    );
  });

  const zxcMap = line3.map((c) => {
    return (
      <button
        disabled={gameOver}
        tabIndex={-1}
        onClick={() => props.handleInput(c)}
        className="bg-prmColor bg-opacity-20 p-2 cstm-flex-col rounded-md text-xs text-prmColor font-bold shadow-solid shadow-indigo-400 h-9 min-w-[1.65rem] text-center 
                    m-l:text-sm m-l:w-8 
                    t:text-base t:w-14 t:h-10 
                    hover:shadow-solid hover:shadow-indigo-400 hover:bg-opacity-10 transition-all
                    disabled:bg-neutral-400 disabled:shadow-neutral-700 disabled:text-white"
        value={c}
        key={c}
      >
        {c}
      </button>
    );
  });

  const handleKeyboard = React.useCallback(
    (event) => {
      if (gameOver) return;

      if (event.key === "Backspace") {
        props.deleteCharacter();
      } else if (event.key === "Enter") {
        props.submitGuess();
      } else {
        line1.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            props.handleInput(key);
          }
        });

        line2.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            props.handleInput(key);
          }
        });

        line3.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            props.handleInput(key);
          }
        });
      }
    },
    [gameOver, line1, line2, line3, props]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="cstm-flex-col gap-3 w-full h-fit mt-10 t:mt-5 l-l:mt-10">
      <div className="cstm-flex-row gap-1 m-l:gap-1.5">{qwertyMap}</div>

      <div className="cstm-flex-row gap-1 m-l:gap-1.5">{asdfMap}</div>

      <div className="cstm-flex-row gap-1 m-l:gap-1.5">
        <button
          disabled={gameOver}
          onClick={props.deleteCharacter}
          className="cstm-flex-col bg-prmColor bg-opacity-20 p-2 rounded-md text-xs text-prmColor shadow-solid shadow-indigo-400 h-9 w-10 text-center 
                    m-l:text-sm 
                    t:w-20 t:h-10 
                    hover:shadow-solid hover:shadow-indigo-400 hover:bg-opacity-10 transition-all
                    disabled:bg-neutral-400 disabled:shadow-neutral-700 disabled:text-white"
        >
          <BsBackspaceFill />
        </button>
        {zxcMap}
        <button
          disabled={gameOver}
          onClick={() => props.submitGuess()}
          className="cstm-flex-col bg-prmColor bg-opacity-20 p-2 rounded-md text-xs text-prmColor shadow-solid shadow-indigo-400 h-9 w-10 text-center 
                    m-l:text-sm 
                    t:w-20 t:h-10 
                    hover:shadow-solid hover:shadow-indigo-400 hover:bg-opacity-10 transition-all
                    disabled:bg-neutral-400 disabled:shadow-neutral-700 disabled:text-white"
        >
          <AiOutlineEnter />
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
