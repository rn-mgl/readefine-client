import Image from "next/image";
import React from "react";

const ActivityCard = (props) => {
  return (
    <div
      className={`${
        props.isEmpty ? "justify-center" : "justify-start"
      } bg-white w-full h-80  p-5 rounded-2xl cstm-flex-col gap-5 t:h-[30rem]`}
    >
      <div className="cstm-flex-col w-full">
        <p className="text-black font-bold t:text-left w-full">{props.label}</p>
      </div>

      {props.isEmpty ? (
        <div className="cstm-flex-col w-full">
          <Image
            src={props.fillerImage}
            alt="filler"
            loading="lazy"
            width={220}
            draggable={false}
          />
          <p className="text-xs opacity-80">{props.fillerText}</p>
        </div>
      ) : (
        <div className="cstm-flex-col gap-5 w-full overflow-y-auto cstm-scrollbar justify-start">
          {props.activity}
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
