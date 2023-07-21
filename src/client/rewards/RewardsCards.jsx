import Image from "next/image";
import React from "react";
import Link from "next/link";
import question from "../../../public/reward/Question.svg";

const RewardsCards = (props) => {
  const rewardImage = props.isReceived ? props.image : question;
  return (
    <div className="bg-white p-5 rounded-2xl cstm-flex-col gap-4 min-w-[18rem] w-72 shadow-solid max-h-[24rem] h-[24rem] relative border-2 border-accntColor">
      <div className="w-full h-fit cstm-flex-col overflow-clip bg-accntColor p-2 rounded-2xl justify-start">
        <Image
          src={rewardImage}
          alt="temp"
          draggable={false}
          className="drop-shadow-md w-fit saturate-150"
          width={250}
          height={250}
        />
      </div>

      <div className="cstm-flex-row font-poppins w-full">
        <p className="font-bold text-black text-sm text-left w-8/12">{props.title}</p>
        <p className="opacity-50 text-sm capitalize w-4/12 text-right justify-start">
          {props.type}
        </p>
      </div>

      {props.isReceived ? (
        <Link
          href={props.to}
          className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 mt-auto"
        >
          View
        </Link>
      ) : (
        <p className="text-sm font-light mt-auto p-2">not yet obtained</p>
      )}
    </div>
  );
};

export default RewardsCards;
