import Image from "next/image";
import React from "react";
import Link from "next/link";

const RewardsCards = (props) => {
  return (
    <div
      className="bg-white p-5 rounded-2xl cstm-flex-col gap-4
                t:w-56
                l-s:w-52
                l-l:w-fit"
    >
      <Image src={props.image} alt="temp" className="rounded-2xl" priority />
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
      </div>

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

export default RewardsCards;
