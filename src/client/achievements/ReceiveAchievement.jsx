import React from "react";
import FileViewer from "../../components/global/FileViewer";
import card1 from "../../../public/landing book.png";
import Confetti from "react-confetti";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";

const ReceiveAchievement = (props) => {
  const buttonAction = props.url ? (
    <Link href={props.url} className="cstm-bg-hover absolute top-3 right-3 z-10">
      <BsArrowRight className="scale-150 text-black " />
    </Link>
  ) : (
    <button
      onClick={props.handleAccomplishedAchievement}
      className="cstm-bg-hover absolute top-3 right-3 z-10"
    >
      <IoClose className="scale-150 text-black " />
    </button>
  );

  return (
    <div className="w-full h-screen fixed top-0 left-0 p-5 z-[60] backdrop-blur-md cstm-flex-col">
      {buttonAction}
      <Confetti width={window?.innerWidth} height={window?.innerHeight} className="z-10" />

      <div className="bg-white p-5 rounded-2xl w-full shadow-solid cstm-flex-col gap-5 animate-slideDown relative z-10 t:w-[25rem] l-l:w-[30rem]">
        <p className="font-bold">Achievement Unlocked!</p>
        <div className="cstm-flex-col p-5 bg-accntColor rounded-2xl">
          <div className="animate-float drop-shadow-lg w-full cstm-flex-col">
            <FileViewer src={props.reward} width="w-full" />
          </div>
        </div>

        <p className="text-prmColor font-extrabold bg-gradient-to-r from-prmColor to-scndColor text-transparent bg-clip-text text-2xl">
          {props.achievementName}
        </p>
        <div className="w-full cstm-scrollbar overflow-y-auto cstm-flex-col gap-5 h-40 justify-start">
          <p className="text-sm text-center">{props.task}</p>
          <p className="text-sm text-center">{props.description}</p>
        </div>
      </div>

      <div className="cstm-light-rays " />
    </div>
  );
};

export default ReceiveAchievement;
