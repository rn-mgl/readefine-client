import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

const ArchivesCards = (props) => {
  return (
    <Link
      href={props.to}
      style={{ animationDuration: `${props.delay}s` }}
      className="bg-white p-5 rounded-2xl  min-w-[16rem] cstm-flex-col gap-4 group transition-all shadow-solid active:shadow-solidActive
            t:w-80 animate-fadeIn
            l-l:w-[22rem]"
    >
      <div className="w-full overflow-hidden rounded-2xl bg-prmColor bg-opacity-5 cstm-flex-col p-1">
        <Image
          src={props.image}
          width={350}
          alt="temp"
          className="rounded-2xl group-hover:scale-110 transition-all duration-300 w-full saturate-150"
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
