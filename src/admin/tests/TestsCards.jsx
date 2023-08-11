import Image from "next/image";
import React from "react";
import Link from "next/link";

const TestsCards = (props) => {
  return (
    <div className="bg-white p-5 rounded-2xl cstm-flex-col gap-4  t:w-72 shadow-md  max-h-[28rem] h-[28rem]">
      <div className="w-full h-fit cstm-flex-col overflow-clip  bg-white rounded-2xl justify-start">
        <Image
          loading="lazy"
          src={props.image}
          alt="temp"
          width={240}
          height={200}
          className="w-fit"
        />
      </div>
      <div className="cstm-flex-row w-full mt-auto mt-auto">
        <div
          className="cstm-flex-col gap-1 font-poppins mr-auto items-start
                    t:text-base"
        >
          <p className="font-bold text-black w-44 whitespace-pre-wrap">
            {props.title ? props.title : "Title"}
          </p>
          <p className="opacity-50 text-sm">{props.author ? props.author : "author"}</p>
        </div>
        <div className="cstm-flex-col gap-1 font-poppins mb-auto">
          <p
            className="font-bold text-prmColor 
                    t:text-base"
          >
            {props.lexile}L
          </p>
        </div>
      </div>

      <Link
        href={props.to}
        className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2"
      >
        Answer
      </Link>
    </div>
  );
};

export default TestsCards;
