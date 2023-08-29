import Image from "next/image";
import React from "react";
import Link from "next/link";

const DashboardCards = (props) => {
  return (
    <div
      className="bg-white p-5 min-h-80 rounded-2xl min-w-[16rem] cstm-flex-col gap-5 group hover:shadow-md
                  t:w-80
                  l-l:w-[22rem]"
    >
      <Link
        href={props.to}
        className="w-fit overflow-hidden rounded-2xl bg-prmColor bg-opacity-10 p-1"
      >
        <Image
          src={props.image}
          priority
          alt="temp"
          className="rounded-2xl group-hover:scale-110 transition-all duration-300 saturate-150"
        />
      </Link>

      <div className="cstm-flex-col w-full gap-2">
        <div
          className="w-full cstm-flex-col font-poppins
                  l-l:items-start"
        >
          <p className="font-bold text-black text-sm mr-auto">{props.label}</p>
          <p className="opacity-50 text-xs capitalize whitespace-pre-wrap mr-auto">
            {props.subLabel}
          </p>
        </div>

        <div className="w-full cstm-flex-row font-poppins">
          <p className="font-bold text-prmColor text-sm mr-auto">Current count: {props.count}</p>
          <Link
            href={props.to}
            className="text-center font-poppins text-sm font-normal bg-prmColor 
                    text-accntColor rounded-full w-fit px-10 p-2 hover:shadow-md"
          >
            Visit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
