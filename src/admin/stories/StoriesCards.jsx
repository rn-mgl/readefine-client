import Image from "next/image";
import React from "react";
import Link from "next/link";

const StoriesCards = (props) => {
  const hasTest = props.testId;
  return (
    <div className="bg-white p-4 rounded-2xl cstm-flex-col gap-4 t:w-72 shadow-md max-h-[30rem] h-[30rem]">
      <div className="w-full h-full cstm-flex-col overflow-clip bg-white rounded-2xl justify-start max-h-72">
        <Image
          priority
          src={props.image}
          alt="temp"
          width={240}
          height={200}
          className="w-full hover:scale-105 transition-all saturate-150"
        />
      </div>

      <div className="cstm-flex-col w-full mt-auto">
        <div className="cstm-flex-row  mr-auto items-start w-full">
          <p className="font-bold text-black w-44 truncate text-left text-sm mr-auto">
            {props.title ? props.title : "Title"}
          </p>
          <p className="font-bold text-prmColor text-sm text-right">
            {props.lexile}L
          </p>
        </div>
        <div className="cstm-flex-row  items-end w-full">
          <p className="opacity-50 text-xs text-left mr-auto w-36 truncate">
            {props.author ? props.author : "author"}
          </p>
          <p className="opacity-50 text-xs text-right">
            {props.genre ? props.genre : "Genre"}
          </p>
        </div>
      </div>

      <div className="cstm-flex-col w-full gap-2">
        <Link
          href={props.visit}
          onClick={props.createAdminActivity}
          className="w-full text-center  text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 "
        >
          Read
        </Link>
        <Link
          href={props.test}
          className={`${
            hasTest
              ? "bg-scndColor text-prmColor"
              : "border-2 border-prmColor bg-white text-prmColor"
          } w-full text-center  text-sm font-normal  rounded-full p-2`}
        >
          {hasTest ? "Test" : "Create Test"}
        </Link>
      </div>
    </div>
  );
};

export default StoriesCards;
