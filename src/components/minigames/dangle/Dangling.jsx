"use client";
import React from "react";

const Dangling = (props) => {
  const [animationTime, setAnimationTime] = React.useState(2);

  React.useEffect(() => {
    setAnimationTime(Math.random() * 1 + 2);
  }, [setAnimationTime]);

  return (
    <div
      style={{
        animationDuration: `${animationTime}s`,
      }}
      className="cstm-flex-col animate-dangle"
    >
      <div className={`${props.isPlaying ? "h-[40vh]" : "h-[50vh]"} w-[.5px] bg-black`} />
      <div
        className="p-2 w-8 h-8 rounded-md bg-black text-accntColor cstm-flex-col text-sm 
                  m-l:text-base m-l:w-10 m-l:h-10
                  t:w-12 t:h-12 t:text-lg"
      >
        {props.isPlaying ? (props.isGuessed || props.gameOver?.over ? props.character : null) : props.character}
      </div>
    </div>
  );
};

export default Dangling;
