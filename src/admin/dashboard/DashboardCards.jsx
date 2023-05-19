import Image from "next/image";
import React from "react";
import Link from "next/link";

const DashboardCards = (props) => {
  return (
    <div
      className="bg-white p-5 rounded-2xl cstm-flex-col gap-4
                l-s:w-[18.5rem]
                l-l:w-fit"
    >
      <Image src={props.image} alt="temp" className="rounded-2xl" priority />
      <div
        className="w-full cstm-flex-col gap-1 font-poppins
                  l-l:items-start"
      >
        <p
          className="font-bold text-black
                      t:text-base"
        >
          {props.label}
        </p>
        <p
          className="opacity-50 text-sm
                     t:text-base"
        >
          {props.subLabel}
        </p>
      </div>

      <div
        className="w-full cstm-flex-col gap-1 font-poppins
                  l-l:cstm-flex-row"
      >
        <p
          className="font-bold text-prmColor
                    t:text-base
                    l-l:mr-auto"
        >
          Current count: {props.count}
        </p>
        <Link
          href={props.to}
          className="text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full w-28 p-2
                t:text-base"
        >
          Visit
        </Link>
      </div>
    </div>
  );
};

export default DashboardCards;
