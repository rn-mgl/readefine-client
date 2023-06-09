import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

const ArchivesCards = (props) => {
  return (
    <Link
      href={props.to}
      className="bg-white p-5 rounded-2xl cstm-flex-col gap-4 group transition-all shadow-solid active:shadow-solidActive
            l-s:w-[18.5rem]
            l-l:w-fit"
    >
      <div className="w-fit overflow-hidden rounded-2xl">
        <Image
          src={props.image}
          width={320}
          alt="temp"
          className="rounded-2xl group-hover:scale-110 transition-all duration-300"
        />
      </div>

      <div className="w-full cstm-flex-col gap-1 font-poppins">
        <p className="text-center font-bold text-prmColor group whitespace-nowrap">{props.label}</p>
        <Suspense fallback={<p>Loading...</p>}>
          <p className="text-xs font-medium opacity-50 group-hover:opacity-100 transition-all">
            {props.subLabel} {props.count}
          </p>
        </Suspense>
      </div>
    </Link>
  );
};

export default ArchivesCards;
