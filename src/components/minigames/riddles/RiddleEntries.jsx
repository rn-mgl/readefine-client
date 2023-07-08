"use client";
import React from "react";

const RiddleEntries = (props) => {
  const entries = props.entryGuesses?.map((l, i) => {
    return (
      <div className="cstm-flex-row h-8 w-8 bg-scndColor bg-opacity-20 rounded-md" key={i}>
        <p className="font-bold text-xs">{l}</p>
      </div>
    );
  });

  return <div className="w-full cstm-flex-row gap-2">{entries}</div>;
};

export default RiddleEntries;
