import Image from "next/image";
import React from "react";
import Link from "next/link";

const RewardsCards = (props) => {
  return (
    <div className="bg-white p-5 rounded-2xl cstm-flex-col gap-4 shadow-md max-h-[25rem] w-72">
      <Link
        onClick={props.createAdminActivity}
        href={props.to}
        className="w-full h-full cstm-flex-col overflow-clip bg-accntColor p-2 rounded-2xl"
      >
        <Image
          src={props.image}
          alt="temp"
          className="drop-shadow-md w-fit saturate-150 hover:scale-110 transition-all"
          width={250}
          priority
          height={250}
        />
      </Link>

      <div className="cstm-flex-row w-full">
        <div className="cstm-flex-row gap-1  w-full">
          <p className="font-bold text-black mr-auto text-sm w-44 truncate text-left">{props.title}</p>
          <p className="opacity-50 text-sm capitalize w-4/12 text-right">{props.type}</p>
        </div>
      </div>

      <Link
        href={props.to}
        onClick={props.createAdminActivity}
        className="w-full text-center  text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 mt-auto"
      >
        See More
      </Link>
    </div>
  );
};

export default RewardsCards;
