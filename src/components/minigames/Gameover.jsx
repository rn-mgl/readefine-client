import React from "react";
import Confetti from "react-confetti";

const Gameover = (props) => {
  const didWin = props.gameOver.status === "win";
  const message = didWin ? "You Won!" : "You Lost";

  const correctWord = props.correctWord?.map((c, i) => {
    return (
      <div className="font-bold cstm-flex-col w-5" key={i}>
        <p>{c}</p>
        <div className="bg-white h-[0.5px] w-full" />
      </div>
    );
  });

  return (
    <div className="fixed w-full h-full backdrop-blur-md z-30 top-0 text-white animate-fadeIn">
      {didWin ? <Confetti width={window.innerWidth} height={window.innerHeight} className="z-50" /> : null}

      <div className="h-3/6 bg-prmColor w-full p-5 cstm-flex-col gap-5 t:gap-10 cstm-w-limit translate-y-full">
        <div className="cstm-flex-col gap-2 w-full">
          <p className="font-extrabold text-xl t:text-2xl">{message}</p>

          {didWin ? (
            <p className="font-light text-sm">
              Time taken: <span className="font-bold">{props.timer} </span> seconds
            </p>
          ) : null}
        </div>

        <div className="cstm-flex-col gap-2">
          <p className="text-sm font-light">{props.label}</p>
          <div className="cstm-flex-row gap-2">{correctWord}</div>
        </div>

        <div className="cstm-flex-col gap-4 w-full t:cstm-flex-row t:gap-5">
          <button
            onClick={props.playAgain}
            className="font-bold bg-scndColor border-2 border-scndColor bg-opacity-70 rounded-full p-2 text-sm w-full shadow-solid shadow-cyan-700
                        t:w-40 t:order-2"
          >
            Play Again
          </button>

          <button
            onClick={props.handleIsPlaying}
            className="font-bold bg-white bg-opacity-20 rounded-full p-2 text-sm w-full border-2 border-white shadow-solid shadow-indigo-500
                        t:w-40 t:order-1"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gameover;
