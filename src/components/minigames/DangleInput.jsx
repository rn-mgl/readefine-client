import React from "react";

const DangleInput = (props) => {
  const dangleInput = props.guess.letters.map((d, i) => {
    return (
      <div className="cstm-flex-col gap-0.5  h-10 justify-end w-8 m-l:w-10" key={i}>
        <p className="capitalize font-bold">{d}</p>
        <div className="w-8 h-[.5px] bg-black m-l:w-10 t:w-14" />
      </div>
    );
  });
  return <div className="mt-auto cstm-flex-row gap-2 t:gap-8 t:text-lg">{dangleInput}</div>;
};

export default DangleInput;
