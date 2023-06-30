import React from "react";

const Dangling = (props) => {
  const time = Math.random() * 5;

  return (
    <div
      style={{
        animationDuration: `${time}s`,
        animationName: "dangle",
        animationDirection: "alternate",
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in-out",
      }}
      className="cstm-flex-col"
    >
      <div className="w-[.5px] h-[50vh] bg-black" />
      <div className="p-2 w-10 h-10 rounded-md bg-black text-white cstm-flex-col ">
        {props.isPlaying ? (props.isSeen ? props.character : null) : props.character}
      </div>
    </div>
  );
};

export default Dangling;
