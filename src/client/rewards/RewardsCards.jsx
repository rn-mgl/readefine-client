import Image from "next/image";
import React from "react";
import Link from "next/link";
import question from "../../../public/Question.svg";

const RewardsCards = (props) => {
  const rewardImage = props.isReceived ? props.image : question;
  return (
    <div className="bg-white p-5 rounded-2xl cstm-flex-col gap-4 w-72 min-h-[27rem] shadow-solid">
      <div className="w-full h-fit cstm-flex-col overflow-clip bg-accntColor p-2 rounded-2xl">
        <Image
          src={rewardImage}
          alt="temp"
          draggable={false}
          className="rounded-2xl drop-shadow-md"
          width={250}
          height={250}
        />

        {!props.isReceived ? <p className="text-xs italic font-light">not yet obtained</p> : null}
      </div>

      <div className="cstm-flex-row font-poppins w-full">
        <p className="font-bold text-black text-sm text-left w-8/12">{props.title}</p>
        <p className="opacity-50 text-sm capitalize w-4/12 text-right justify-start">
          {props.type}
        </p>
      </div>

      <Link
        href={props.to}
        className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 mt-auto"
      >
        See More
      </Link>
    </div>
  );
};

export default RewardsCards;
