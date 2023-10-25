import Image from "next/image";
import React from "react";

const FindRewardCards = (props) => {
  return (
    <div className="bg-white shadow-md p-5 rounded-2xl cstm-flex-col gap-4 w-72 min-h-[24rem] h-[24rem] justify-start">
      <Image
        src={props.image}
        alt="temp"
        className="rounded-2xl bg-accntColor p-5 h-full saturate-150 drop-shadow-md"
        width={250}
        height={250}
        priority
      />

      <div
        className="cstm-flex-row  w-full 
                    t:cstm-flex-col t:text-center"
      >
        <p className="font-bold text-black text-center w-44 truncate">{props.title}</p>
        <p className="opacity-50 text-sm">{props.type}</p>
      </div>

      <button
        onClick={() => {
          props.selectReward();
          props.handleCanSelectReward();
        }}
        className="w-full text-center  text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 mt-auto"
      >
        Select
      </button>
    </div>
  );
};

export default FindRewardCards;
