import { nanoid } from "nanoid";
import React from "react";

const RiddleInput = (props) => {
  const blocks = props.guess?.letters.map((c, i) => {
    return (
      <div
        className="w-10 h-10 bg-neutral-200 rounded-md cstm-flex-col font-bold"
        key={nanoid()}
      >
        {c}
      </div>
    );
  });
  return (
    <div className="w-full my-auto">
      <div className="cstm-flex-row gap-2">{blocks}</div>
    </div>
  );
};

export default RiddleInput;
