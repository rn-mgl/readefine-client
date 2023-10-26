import Image from "next/image";
import React from "react";
import Link from "next/link";

const DashboardCards = (props) => {
  return (
    <div
      className="bg-white p-4 min-h-80 rounded-2xl min-w-[16rem] cstm-flex-col gap-4 group hover:shadow-md
                  t:w-80
                  l-l:w-[22rem]"
    >
      <Link href={props.to} className="w-fit overflow-hidden rounded-2xl bg-prmColor bg-opacity-10 p-1">
        <Image
          src={props.image}
          priority
          alt="temp"
          className="rounded-2xl group-hover:scale-110 transition-all duration-300 saturate-150"
        />
      </Link>

      <div className="cstm-flex-col w-full gap-4">
        <div
          className="w-full cstm-flex-col 
                  l-l:items-start"
        >
          <p className="font-bold text-black text-sm mr-auto">{props.label}</p>
          <p className="opacity-50 text-xs capitalize whitespace-pre-wrap mr-auto">{props.subLabel}</p>
        </div>

        <div className="w-full cstm-flex-row ">
          <Link
            href={props.to}
            className="text-center  text-sm font-normal bg-prmColor 
                    text-accntColor rounded-md w-full p-2 hover:shadow-md"
          >
            Visit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
