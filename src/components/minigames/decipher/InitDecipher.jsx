"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import TextShuffleAnimation from "../../global/TextShuffleAnimation";

import decipherBgUp from "@/public/decipher/DecipherBGUp.svg";
import decipherBgDown from "@/public/decipher/DecipherBGDown.svg";

import { BsArrowLeft, BsQuestionCircle } from "react-icons/bs";

const InitDecipher = (props) => {
  return (
    <>
      <div className="absolute top-0 right-0 cstm-flex-col gap-2 z-10">
        <Link href={props.to} className="cstm-bg-hover ">
          <BsArrowLeft className="text-xl" />
        </Link>

        <button onClick={props.handleCanSeeTutorial} className="cstm-bg-hover">
          <BsQuestionCircle className="text-xl" />
        </button>
      </div>

      <TextShuffleAnimation title="DECIPHER" />

      <button
        onClick={() => {
          props.handleIsPlaying();
          props.getWord();
        }}
        className="bg-prmColor shadow-solid shadow-indigo-900 p-2 rounded-full text-scndColor font-bold w-fit px-10
        t:w-40 relative z-20"
      >
        PLAY
      </button>

      <Image
        src={decipherBgUp}
        alt="decipherBg"
        style={{ animationDelay: "0.5s" }}
        className="w-full t:w-7/12 absolute top-0 left-0 animate-pulse z-0"
        priority
      />

      <Image
        src={decipherBgDown}
        alt="decipherBg"
        className="w-full t:w-7/12 absolute bottom-0 right-0 animate-pulse z-0"
        priority
      />
    </>
  );
};

export default InitDecipher;
