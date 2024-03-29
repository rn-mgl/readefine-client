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
    <>
      <div className="absolute top-0 right-0 cstm-flex-col gap-2 z-10 ">
        <Link href={props.to} className="cstm-bg-hover ">
          <BsArrowLeft className="text-xl" />
        </Link>

        <button onClick={props.handleCanSeeTutorial} className="cstm-bg-hover">
          <BsQuestionCircle className="text-xl" />
        </button>
      </div>

      <div className={`${props.isPlaying ? "mb-auto" : "mb-0"} cstm-flex-row gap-2 absolute -top-52 t:gap-4`}>
        {dangles}
      </div>

      <button
        onClick={() => {
          props.getRandomWord();
          props.handleIsPlaying();
        }}
        className="bg-prmColor shadow-solid shadow-indigo-900 p-2 rounded-full text-scndColor font-bold w-fit px-10 mt-auto
        t:w-40 relative z-20"
      >
        Play
      </button>
    </>
  );
};

export default InitDangle;
