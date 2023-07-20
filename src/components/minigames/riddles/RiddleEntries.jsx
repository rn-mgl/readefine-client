"use client";
import React from "react";

const RiddleEntries = (props) => {
  const entries = props.entryGuesses?.map((l, i) => {
    return (
      <div
        className="cstm-flex-row h-8 w-8 bg-scndColor bg-opacity-20 rounded-md t:w-10 t:h-10 l-s:w-12 l-s:h-12"
        key={i}
      >
        <p className="font-bold text-xs t:text-sm l-s:text-base">{l}</p>
      </div>
    );
  });

  return <div className="w-full cstm-flex-row gap-2 mb-auto">{entries}</div>;
};

export default RiddleEntries;
