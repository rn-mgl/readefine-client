import Image from "next/image";
import React from "react";
import Link from "next/link";

const StoriesCards = (props) => {
  const hasTest = props.testId;
  return (
    <div className="bg-white p-5 rounded-2xl cstm-flex-col gap-4 t:w-72 shadow-md max-h-[30rem] h-[30rem]">
      <div className="w-full h-fit cstm-flex-col overflow-clip  bg-white rounded-2xl justify-start">
        <Image priority src={props.image} alt="temp" width={240} height={200} className="w-fit" />
      </div>

      <div className="cstm-flex-col w-full mt-auto">
        <div className="cstm-flex-row font-poppins mr-auto items-start w-full">
          <p className="font-bold text-black overflow-x-auto w-44 text-left text-sm mr-auto">
            {props.title ? props.title : "Title"}
          </p>
          <p className="font-bold text-prmColor text-sm text-right">{props.lexile}L</p>
        </div>
        <div className="cstm-flex-row font-poppins items-end w-full">
          <p className="opacity-50 text-xs text-left mr-auto">
            {props.author ? props.author : "author"}
          </p>
          <p className="opacity-50 text-xs text-right">{props.genre ? props.genre : "Genre"}</p>
        </div>
      </div>

      <div className="cstm-flex-col w-full gap-2">
        <Link
          href={props.visit}
          className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 "
        >
          Read
        </Link>
        <Link
          href={props.test}
          className={`${
            hasTest
              ? "bg-scndColor text-prmColor"
              : "border-2 border-scndColor bg-white text-prmColor"
          } w-full text-center font-poppins text-sm font-normal  rounded-full p-2`}
        >
          {hasTest ? "Test" : "Create Test"}
        </Link>
      </div>
    </div>
  );
};

export default StoriesCards;
