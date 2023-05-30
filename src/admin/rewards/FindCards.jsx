import Image from "next/image";
import React from "react";

const FindCards = (props) => {
  return (
    <div
      className="bg-white shadow-md p-5 rounded-2xl cstm-flex-col gap-4 w-fit
                t:cstm-flex-row t:w-full"
    >
      <Image
        src={props.image}
        alt="temp"
        className="rounded-2xl t:w-28"
        width={200}
        height={200}
        priority
      />

      <div
        className="cstm-flex-row gap-1 font-poppins w-full 
                    t:cstm-flex-col t:text-center"
      >
        <p className="font-bold text-black mr-auto t:mr-0">{props.title}</p>
        <p className="opacity-50 text-sm">{props.type}</p>
      </div>

      <button
        onClick={() => {
          props.selectReward();
          props.handleCanSelectReward();
        }}
        className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2
                t:w-fit t:px-6"
      >
        Select
      </button>
    </div>
  );
};

export default FindCards;
