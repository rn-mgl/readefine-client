import React from "react";
import { IoClose } from "react-icons/io5";

const DangleHint = (props) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen backdrop-blur-md z-10">
      <button onClick={props.handleCanSeeHint} className="cstm-bg-hover absolute top-3 right-3">
        <IoClose className="scale-150 text-prmColor" />
      </button>
      {props.wordData.definition}
    </div>
  );
};

export default DangleHint;
