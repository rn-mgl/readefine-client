import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";

const ArchivesCards = (props) => {
  return (
    <Link
      href={props.to}
      className="bg-white p-5 rounded-2xl cstm-flex-col gap-4 group hover:shadow-md
            l-s:w-[18.5rem]
            l-l:w-fit"
    >
      <div className="w-fit overflow-hidden rounded-2xl">
        <Image
          src={props.image}
          width={320}
          alt="temp"
          className="rounded-2xl group-hover:scale-110 transition-all duration-300"
          priority
        />
      </div>

      <div className="w-full cstm-flex-col gap-1 font-poppins">
        <p className="text-center font-bold text-prmColor group whitespace-nowrap">{props.label}</p>
        <p className="text-xs font-medium opacity-50">
          {props.subLabel} {props.count}
        </p>
      </div>
    </Link>
  );
};

export default ArchivesCards;
