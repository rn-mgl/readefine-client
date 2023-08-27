import Image from "next/image";
import React from "react";
import Link from "next/link";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import ActionLabel from "../../components/global/ActionLabel";

const TestsCards = (props) => {
  const buttonIfLower = props.isLower ? (
    <button
      onClick={() => {
        props.handleShowLexileMessage();
        props.handleSelectedBook(props.testId);
      }}
      className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2"
    >
      Answer
    </button>
  ) : (
    <Link
      href={props.to}
      className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2"
    >
      Answer
    </Link>
  );

  return (
    <div className="bg-white p-5 rounded-2xl cstm-flex-col gap-4 w-72 shadow-solid max-h-[28rem] h-[28rem] relative border-2 border-accntColor">
      {props.isTaken ? (
        <div className="group absolute top-4 right-4">
          <ActionLabel label="Test Taken" />
          <IoCheckmarkDoneCircle className="text-prmColor scale-150" />
        </div>
      ) : null}
      <div className="w-full h-fit cstm-flex-col overflow-clip  bg-white rounded-2xl justify-start">
        <Image src={props.image} alt="temp" width={240} height={200} className="w-fit" />
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
          {props.isTaken ? (
            <p className="text-prmColor">
              <span className="font-bold"> {props.score}</span> / 10
            </p>
          ) : null}
        </div>
      </div>

      {props.isTaken ? (
        <button
          onClick={() => props.handleSeeTestRecord(props.testId)}
          className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2"
        >
          See Record
        </button>
      ) : (
        buttonIfLower
      )}
    </div>
  );
};

export default TestsCards;
