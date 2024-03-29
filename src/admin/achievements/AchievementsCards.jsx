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
    <div className="bg-white p-4 rounded-2xl cstm-flex-col gap-4 min-h-[26rem] w-72 min-w-[18rem] transition-all justify-start shadow-md">
      <Link
        onClick={props.createAdminActivity}
        href={props.to}
        className="w-full cstm-flex-col overflow-clip bg-accntColor h-full p-4 rounded-2xl"
      >
        <Image
          src={props.image}
          alt="temp"
          width={250}
          height={250}
          className="h-[14rem] saturate-150 hover:scale-110 transition-all"
          priority
        />
      </Link>
      <div className="cstm-flex-col gap-1 w-full">
        <div className="cstm-flex-row  mr-auto items-start w-full">
          <p className="font-bold text-black mr-auto w-44 truncate text-left">{props.title}</p>
          <p className="font-bold text-prmColor w-4/12 text-right">{props.goal}</p>
        </div>
        <div className="cstm-flex-row w-full ">
          <p className="font-bold text-prmColor mr-auto text-sm">{props.type}</p>
          <button onClick={handleSetActive} className="shadow-none hover:shadow-none">
            <BiChevronDown className={`${isActive ? "rotate-180" : "rotate-0"} transition-all text-xl`} />
          </button>
        </div>
      </div>

      {isActive ? (
        <div className="cstm-flex-col text-sm overflow-auto w-56 text-center gap-4">
          <p className="font-light w-fit overflow-auto whitespace-pre-wrap">{props.task}</p>
        </div>
      ) : null}

      <Link
        href={props.to}
        onClick={props.createAdminActivity}
        className="w-full text-center  text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 mt-auto"
      >
        Visit
      </Link>
    </div>
  );
};

export default AchievementsCards;
