import Image from "next/image";
import React from "react";
import Link from "next/link";

const StoriesCards = (props) => {
  return (
    <div
      className="bg-white p-5 rounded-2xl cstm-flex-col gap-4 w-full h-96
                t:w-56 t:h-[19rem]
                l-s:w-52 
                l-l:w-fit l-l:h-96"
    >
      <div className="w-full max-h-52 cstm-flex-col overflow-clip rounded-2xl bg-white">
        <Image src={props.image} alt="temp" width={250} height={200} priority />
      </div>

      <div className="cstm-flex-row w-full">
        <div className="cstm-flex-col gap-1 font-poppins mr-auto items-start">
          <p
            className="font-bold text-black
                      t:text-base"
          >
            {props.title ? props.title : "Title"}
          </p>
          <p
            className="opacity-50 text-sm
                     t:text-base"
          >
            {props.author ? props.author : "author"}
          </p>
        </div>
        <div className="cstm-flex-col gap-1 font-poppins items-end">
          <p
            className="font-bold text-prmColor 
                    t:text-base"
          >
            {props.lexile}L
          </p>
          <p
            className="opacity-50 text-sm
                    t:text-base"
          >
            {props.genre ? props.genre : "Genre"}
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

export default StoriesCards;
