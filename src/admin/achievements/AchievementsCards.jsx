"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";

const AchievementsCards = (props) => {
  const [isActive, setIsActive] = React.useState(false);

  const handleSetActive = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className="bg-white p-5 rounded-2xl cstm-flex-col gap-4 w-fit transition-all">
      <div className="w-full h-fit cstm-flex-col overflow-clip bg-white">
        <Image
          src={props.image}
          alt="temp"
          width={250}
          height={200}
          priority
          className="rounded-2xl p-5 bg-accntColor"
        />
      </div>
      <div className="cstm-flex-row w-full">
        <div className="cstm-flex-col gap-1 font-poppins mr-auto items-start">
          <p
            className="font-bold text-black
                      t:text-base"
          >
            {props.title}
          </p>
          <p
            className="opacity-50 text-sm
                     t:text-base"
          >
            {props.type}
          </p>
        </div>
        <div className="cstm-flex-col gap-1 font-poppins items-end mb-auto">
          <p
            className="font-bold text-prmColor  
                    t:text-base"
          >
            {props.goal}
          </p>
          <div className="cstm-bg-hover">
            <BiChevronDown
              className={`${isActive ? "rotate-180" : "rotate-0"} transition-all scale-150`}
              onClick={handleSetActive}
            />
          </div>
        </div>
      </div>

      {isActive ? (
        <div className="cstm-flex-col text-sm overflow-auto w-56 text-center gap-2">
          <p className="font-semibold text-prmColor">{props.specifics}</p>
          <p className="font-light w-fit overflow-auto whitespace-pre-wrap">{props.task}</p>
        </div>
      ) : null}

      <Link
        href={props.to}
        className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2
                t:text-base"
      >
        Visit
      </Link>
    </div>
  );
};

export default AchievementsCards;
