import Image from "next/image";
import React from "react";
import Link from "next/link";

const TestsCards = (props) => {
  return (
    <div className="bg-white p-4 rounded-2xl cstm-flex-col gap-4  t:w-72 shadow-md  max-h-[28rem] h-[28rem]">
      <div className="w-full h-fit cstm-flex-col overflow-clip  bg-white rounded-2xl justify-start max-h-72">
        <Image
          priority
          src={props.image}
          alt="temp"
          width={240}
          height={200}
          className="w-full hover:scale-105 transition-all saturate-150"
        />
      </div>
      <div className="cstm-flex-col gap-1 w-full mt-auto">
        <div className="cstm-flex-row  items-start w-full">
          <p className="font-bold text-black w-44 truncate text-sm text-left mr-auto">
            {props.title ? props.title : "Title"}
          </p>
          <p className="font-bold text-prmColor text-sm">{props.lexile}L</p>
        </div>
        <div className="cstm-flex-row w-full text-xs">
          <p className="opacity-50 mr-auto w-36 truncate">
            {props.author ? props.author : "author"}
          </p>
        </div>
      </div>

      <Link
        onClick={props.createAdminActivity}
        href={props.to}
        className="w-full text-center  text-sm font-normal bg-prmColor text-accntColor rounded-full p-2"
      >
        Answer
      </Link>
    </div>
  );
};

export default TestsCards;
