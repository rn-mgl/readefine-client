import React from "react";
import Link from "next/link";
import Dangling from "./Dangling";
import { BsArrowLeft } from "react-icons/bs";

const InitDangle = (props) => {
  const dangles = "dangle".split("").map((c, i) => {
    return (
      <React.Fragment key={i}>
        <Dangling character={c} isPlaying={props.isPlaying} />
      </React.Fragment>
    );
  });

  return (
    <div className="w-full h-[95vh] cstm-w-limit cstm-flex-col relative">
      <Link href={props.to} className="cstm-bg-hover ml-auto absolute top-0 right-0">
        <BsArrowLeft className="text-black scale-100 m-l:scale-125" />
      </Link>

      <div
        className={`${
          props.isPlaying ? "mb-auto" : "mb-0"
        } cstm-flex-row gap-2 absolute -top-52 t:gap-5`}
      >
        {dangles}
      </div>

      <button
        onClick={() => {
          props.getRandomWord();
          props.handleIsPlaying();
        }}
        className="bg-prmColor shadow-solid shadow-indigo-900 p-2 rounded-full text-scndColor font-bold w-full mt-auto
        t:w-40"
      >
        Play
      </button>
    </div>
  );
};

export default InitDangle;
