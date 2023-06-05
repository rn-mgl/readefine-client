import Image from "next/image";
import React from "react";
import Link from "next/link";

const RewardsCards = (props) => {
  return (
    <div className="bg-white p-5 rounded-2xl cstm-flex-col gap-4 w-fit">
      <div className="w-full h-fit cstm-flex-col overflow-clip bg-accntColor p-2 rounded-2xl">
        <Image
          src={props.image}
          alt="temp"
          className="rounded-2xl drop-shadow-md"
          width={250}
          height={200}
          priority
        />
      </div>

      <div className="cstm-flex-row w-full">
        <div className="cstm-flex-row gap-1 font-poppins w-full">
          <p className="font-bold text-black mr-auto">{props.title}</p>
          <p className="opacity-50 text-sm">{props.type}</p>
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
