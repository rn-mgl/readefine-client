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
      <div className="w-[.5px] h-[50vh] bg-black" />
      <div
        className="p-2 w-8 h-8 rounded-md bg-black text-white cstm-flex-col text-sm 
                  m-l:text-base m-l:w-10 m-l:h-10
                  t:w-16 t:h-16 t:text-xl"
      >
        {props.isGuessed ? props.character : null}
      </div>
    </div>
  );
};

export default Dangling;
