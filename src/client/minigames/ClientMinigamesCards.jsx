import Image from "next/image";
import React from "react";
import Link from "next/link";

const ClientMinigamesCards = (props) => {
  return (
    <div
      style={{ animationDuration: `${props.delay}s` }}
      className="bg-white p-5 rounded-2xl min-w-[16rem] cstm-flex-col gap-2 group shadow-solid group
                  t:w-80 animate-fadeIn
                  l-l:w-[22rem]"
    >
      <Link href={props.to} className="w-full overflow-hidden rounded-2xl bg-accntColor p-1">
        <Image
          src={props.image}
          priority
          alt="temp"
          className="rounded-2xl group-hover:scale-110 transition-all duration-300 w-full"
        />
      </Link>

      <p
        className="font-bold text-black
                      t:text-base"
      >
        {props.label}
      </p>
      <p className="text-xs group-hover:opacity-100 opacity-50">
        {props.subLabel} {props.count}
      </p>
      <Link
        href={props.to}
        className="text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full w-28 p-2 hover:shadow-md"
      >
        Play
      </Link>
    </div>
  );
};

export default ClientMinigamesCards;
