"use client";
import React from "react";
import FileViewer from "../../components/global/FileViewer";
import Confetti from "react-confetti";
import Link from "next/link";

import rewardMusic from "../../../public/music/reward/Reward Music.mp3";
import rewardNotice from "../../../public/music/reward/Reward Notice.mp3";

import { IoClose } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";

const ReceiveAchievement = (props) => {
  const achievements = props?.achievements?.map((a) => {
    return (
      <div
        key={a.achievement_id}
        className="bg-white p-5 rounded-2xl w-full m-s:min-w-full t:min-w-0 shadow-solid cstm-flex-col gap-5 animate-slideDown relative z-10 t:w-[25rem] l-l:w-[30rem]"
      >
        <p className="font-bold">Achievement Unlocked!</p>
        <div className="cstm-flex-col p-5 bg-accntColor rounded-2xl">
          <div className="animate-float drop-shadow-lg w-full cstm-flex-col">
            <FileViewer src={a.reward} width="w-full" />
          </div>
        </div>

        <p className="text-prmColor font-extrabold bg-gradient-to-r from-prmColor to-scndColor text-transparent bg-clip-text text-2xl">
          {a.achievement_name}
        </p>
        <div className="w-full cstm-scrollbar-2 overflow-y-auto cstm-flex-col gap-5 h-40 justify-start">
          <p className="text-sm text-center">{a.task}</p>
          <p className="text-sm text-center">{a.description}</p>
        </div>
      </div>
    );
  });

  const buttonAction = props.url ? (
    <Link href={props.url} className="cstm-bg-hover absolute top-3 right-3 z-10">
      <BsArrowRight className="scale-150  text-white" />
    </Link>
  ) : (
    <button
      onClick={props.handleAccomplishedAchievement}
      className="cstm-bg-hover absolute top-3 right-3 z-10"
    >
      <IoClose className="scale-150  text-white " />
    </button>
  );

  return (
    <div className="w-full h-screen fixed top-0 left-0 p-5 z-[60] backdrop-blur-md cstm-flex-col">
      {buttonAction}
      <Confetti width={window?.innerWidth} height={window?.innerHeight} className="z-10" />

      <audio autoPlay>
        <source src={rewardNotice} type="audio/mp3" />
      </audio>

      <audio autoPlay loop>
        <source src={rewardMusic} type="audio/mp3" />
      </audio>

      <div className="cstm-flex-row gap-5 w-full h-full overflow-x-auto scrollbar-none">
        {achievements}
      </div>

      <div className="cstm-light-rays " />
    </div>
  );
};

export default ReceiveAchievement;
