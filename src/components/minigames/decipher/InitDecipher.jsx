"use client";
import Link from "next/link";
import React from "react";
import TextShuffleAnimation from "../../global/TextShuffleAnimation";
import decipherBgUp from "../../../../public/DecipherBGUp.svg";
import decipherBgDown from "../../../../public/DecipherBGDown.svg";
import { BsArrowLeft } from "react-icons/bs";
import Image from "next/image";

const InitDecipher = (props) => {
  return (
    <div className="w-full h-[95vh] cstm-w-limit cstm-flex-col relative overflow-hidden gap-5 animate-fadeIn">
      <Link className="cstm-bg-hover ml-auto absolute top-0 right-0 z-10" href={props.to}>
        <BsArrowLeft className="text-black scale-100 m-l:scale-125" />
      </Link>
      <TextShuffleAnimation title="DECIPHER" />

      <button
        onClick={() => {
          props.handleIsPlaying();
          props.getWord();
        }}
        className="bg-prmColor shadow-solid shadow-indigo-900 p-2 rounded-full text-scndColor font-bold w-fit px-10 z-10
        t:w-40"
      >
        PLAY
      </button>

      <Image
        src={decipherBgUp}
        alt="decipherBg"
        style={{ animationDelay: "0.5s" }}
        className="w-full t:w-7/12 absolute top-0 left-0 animate-pulse"
      />

      <Image
        src={decipherBgDown}
        alt="decipherBg"
        className="w-full t:w-7/12 absolute bottom-0 right-0 animate-pulse"
      />
    </div>
  );
};

export default InitDecipher;
