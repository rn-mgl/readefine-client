import Image from "next/image";
import React from "react";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import ActionLabel from "@/components/global/ActionLabel";
import Link from "next/link";

const StoriesCards = (props) => {
  const hasTest = props.testId;
  const buttonOnLexile = props.isLower ? (
    <button
      onClick={() => {
        props.handleShowLexileMessage();
        props.handleSelectedBook(props.testId);
      }}
      className="w-full text-center  text-sm font-normal bg-scndColor text-prmColor rounded-full p-2"
    >
      Answer
    </button>
  ) : (
    <Link
      href={props.test}
      className="w-full text-center  text-sm font-normal bg-scndColor text-prmColor rounded-full p-2"
    >
      Answer
    </Link>
  );

  return (
    <div className="bg-white p-4 rounded-2xl cstm-flex-col h-[30rem] gap-4 w-72 shadow-solid max-h-[30rem] relative border-2 border-accntColor">
      {props.isRead ? (
        <div className="group absolute top-2 right-5 z-10">
          <ActionLabel label="Finished Reading" />
          <BsFillBookmarkCheckFill className="text-prmColor absolute scale-150 top-3 right-0 drop-shadow-md shadow-prmColor" />
        </div>
      ) : null}

      <div className="w-full h-full cstm-flex-col overflow-clip bg-white rounded-2xl justify-start ">
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
          <p className="font-bold text-prmColor text-sm text-right">{props.lexile}L</p>
        </div>
        <div className="cstm-flex-row  items-end w-full">
          <p className="opacity-50 text-xs text-left mr-auto w-36 truncate">{props.author ? props.author : "author"}</p>
          <p className="opacity-50 text-xs text-right">{props.genre ? props.genre : "Genre"}</p>
        </div>
      </div>

      <div className="cstm-flex-col w-full gap-2">
        <Link
          href={props.read}
          className="w-full text-center  text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 "
        >
          Read
        </Link>
        {hasTest ? (
          props.isTaken ? (
            <p className="text-xs italic">You already took this test</p>
          ) : (
            buttonOnLexile
          )
        ) : (
          <p className="text-xs italic">This story does not have a test yet.</p>
        )}
      </div>
    </div>
  );
};

export default StoriesCards;
