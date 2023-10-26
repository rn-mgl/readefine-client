"use client";
import React from "react";
import Confetti from "react-confetti";
import Link from "next/link";
import Volume from "@/components/global/Volume";

import rewardMusic from "@/public/music/reward/Reward Music.mp3";
import rewardNotice from "@/public/music/reward/Reward Notice.mp3";

import { IoClose } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";
import { useAudioControls } from "@/hooks/useAudioControls";
import Image from "next/image";

const ReceiveAchievement = (props) => {
  const { audioRef, isPlaying, isMuted, handleMuteVolume, handleToggleAudio, handleVolumeChange } = useAudioControls();

  const achievements = props?.achievements?.map((a) => {
    return (
      <div
        key={a.achievement_id}
        className="bg-white p-4 rounded-2xl w-full m-s:min-w-full t:min-w-0 shadow-solid cstm-flex-col m-2 
                    gap-4 animate-slideDown relative z-10 t:w-[25rem] l-l:w-[30rem]"
      >
        <p className="font-bold">Achievement Unlocked!</p>

        <div className="cstm-flex-col p-4 bg-accntColor rounded-2xl">
          <div className="animate-float drop-shadow-lg w-full cstm-flex-col">
            <Image
              src={a.reward}
              alt="viewer"
              width={350}
              height={350}
              className="w-full rounded-2xl"
              draggable={false}
              priority
            />
          </div>
        </div>

        <p
          className="text-prmColor font-extrabold bg-gradient-to-r text-center w-full
                      from-prmColor to-scndColor text-transparent bg-clip-text text-2xl"
        >
          {a.achievement_name}
        </p>

        <div className="w-full cstm-scrollbar-2 overflow-y-auto cstm-flex-col gap-4 h-40 justify-start">
          <p className="text-sm text-center">{a.task}</p>

          <p className="text-sm text-center">{a.description}</p>
        </div>
      </div>
    );
  });

  const buttonAction = props.url ? (
    <Link href={props.url} className="cstm-bg-hover top-3 right-3 z-10">
      <BsArrowRight className="scale-150  text-white" />
    </Link>
  ) : (
    <button onClick={props.resetAchievement} className="cstm-bg-hover top-3 right-3 z-10">
      <IoClose className="scale-150  text-white " />
    </button>
  );

  return (
    <div
      className="w-full h-screen fixed top-0 left-0 p-4 z-[60]
                  backdrop-blur-md cstm-flex-col gap-4 justify-start"
    >
      <div className="cstm-flex-row w-full relative z-20 items-start">
        <div className="cstm-flex-col gap-2 z-10 text-white mr-auto flex-col-reverse">
          <Volume
            isMuted={isMuted}
            isPlaying={isPlaying}
            handleMuteVolume={handleMuteVolume}
            handleVolumeChange={handleVolumeChange}
            handleToggleAudio={handleToggleAudio}
          />
        </div>

        {buttonAction}
      </div>

      <Confetti width={window?.innerWidth} height={window?.innerHeight} className="z-10" />

      <audio autoPlay ref={audioRef}>
        <source src={rewardNotice} type="audio/mp3" />
      </audio>

      <audio autoPlay loop ref={audioRef}>
        <source src={rewardMusic} type="audio/mp3" />
      </audio>

      <div
        className="cstm-flex-col gap-4 w-full h-full cstm-scrollbar overflow-y-auto overflow-x-hidden
                  justify-start t:cstm-flex-row t:justify-center t:items-start t:flex-wrap"
      >
        {achievements}
      </div>

      <div className="cstm-light-rays " />
    </div>
  );
};

export default ReceiveAchievement;
