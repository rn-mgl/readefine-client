import React from "react";
import { BsArrowLeft } from "react-icons/bs";

const DecipherGame = (props) => {
  return (
    <div className="w-full cstm-w-limit cstm-flex-col h-[95vh] justify-start">
      <button onClick={props.handleIsPlaying} className="cstm-bg-hover ml-auto">
        <BsArrowLeft />
      </button>
    </div>
  );
};

export default DecipherGame;
