import Image from "next/image";
import React from "react";
import Link from "next/link";

const StoriesCards = (props) => {
  const hasTest = props.testId;
  return (
    <div className="bg-white p-5 rounded-2xl cstm-flex-col gap-4 t:w-72 shadow-md max-h-[30rem] h-[30rem]">
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

      <div className="cstm-flex-row w-full">
        <div className="cstm-flex-col gap-1 font-poppins mr-auto items-start">
          <p
            className="font-bold text-black overflow-x-auto w-44
                      t:text-base"
          >
            {props.title ? props.title : "Title"}
          </p>
          <p className="opacity-50 text-sm">{props.author ? props.author : "author"}</p>
        </div>
        <div className="cstm-flex-col gap-1 font-poppins items-end">
          <p className="font-bold text-prmColor t:text-base">{props.lexile}L</p>
          <p className="opacity-50 text-sm">{props.genre ? props.genre : "Genre"}</p>
        </div>
      </div>

      <div className="cstm-flex-col w-full gap-2 mt-auto">
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
              : "border-2 border-scndColor bg-white text-scndColor"
          } w-full text-center font-poppins text-sm font-normal  rounded-full p-2`}
        >
          {hasTest ? "Test" : "Create Test"}
        </Link>
      </div>
    </div>
  );
};

export default StoriesCards;
