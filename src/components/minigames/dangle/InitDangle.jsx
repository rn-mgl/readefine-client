import React from "react";
import Link from "next/link";
import Dangling from "./Dangling";
import { BsArrowLeft, BsQuestionCircle } from "react-icons/bs";

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
      <div className="absolute top-0 right-0 cstm-flex-col gap-2 z-10">
        <Link href={props.to} className="cstm-bg-hover ">
          <BsArrowLeft className="scale-125" />
        </Link>

        <button onClick={props.handleCanSeeTutorial} className="cstm-bg-hover">
          <BsQuestionCircle className="scale-125" />
        </button>
      </div>

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
        className="bg-prmColor shadow-solid shadow-indigo-900 p-2 rounded-full text-scndColor font-bold w-fit px-10 mt-auto
        t:w-40"
      >
        Play
      </button>
    </div>
  );
};

export default InitDangle;
