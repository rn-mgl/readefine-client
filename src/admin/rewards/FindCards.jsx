import Image from "next/image";
import React from "react";

const FindCards = (props) => {
  console.log(props);
  return (
    <div className="bg-white shadow-md p-5 rounded-2xl cstm-flex-col gap-4 w-fit">
      <Image
        src={props.image}
        alt="temp"
        className="rounded-2xl"
        width={250}
        height={200}
        priority
      />
      <div className="cstm-flex-row w-full">
        <div className="cstm-flex-row gap-1 font-poppins w-full">
          <p className="font-bold text-black mr-auto">{props.title}</p>
          <p className="opacity-50 text-sm">{props.type}</p>
        </div>
      </div>

      <button
        onClick={() => {
          props.selectReward();
          props.handleCanSelectReward();
        }}
        // name="reward"
        className="w-full text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2
                t:text-base"
      >
        Select
      </button>
    </div>
  );
};

export default FindCards;
