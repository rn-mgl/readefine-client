import Image from "next/image";
import React from "react";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import ActionLabel from "../../components/global/ActionLabel";
import Link from "next/link";

const StoriesCards = (props) => {
  const buttonIfLower = props.isLower ? (
    <button
      onClick={() => {
        props.handleShowLexileMessage();
        props.handleSelectedBook(props.testId);
      }}
      className="w-full text-center font-poppins text-sm font-normal bg-scndColor text-prmColor rounded-full p-2"
    >
      Answer
    </button>
  ) : (
    <Link
      href={props.test}
      className="w-full text-center font-poppins text-sm font-normal bg-scndColor text-prmColor rounded-full p-2"
    >
      Answer
    </Link>
  );

  return (
    <div className="bg-white p-5 rounded-2xl cstm-flex-col gap-4 t:w-72 shadow-solid max-h-[30rem] relative">
      {props.isRead ? (
        <div className="group absolute top-2 right-5">
          <ActionLabel label="Finished Reading" />
          <BsFillBookmarkCheckFill className="text-prmColor absolute scale-150 top-3 right-0 drop-shadow-md shadow-prmColor" />
        </div>
      ) : null}

      <div className="w-full h-fit cstm-flex-col overflow-clip bg-white rounded-2xl justify-start ">
        <Image src={props.image} alt="temp" width={240} height={200} className="w-fit" />
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

      <div className="cstm-flex-col w-full gap-2">
        <Link
          href={props.visit}
          className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 "
        >
          Read
        </Link>
        {props.isTaken ? (
          <p className="text-sm italic">You already took this test</p>
        ) : (
          buttonIfLower
        )}
      </div>
    </div>
  );
};

export default StoriesCards;
