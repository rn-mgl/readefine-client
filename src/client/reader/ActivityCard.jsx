import React from "react";
import noGame from "@/public/profile/NoGame.svg";
import Image from "next/image";

const ActivityCard = (props) => {
  return (
    <div className="w-full h-96 t:h-[30rem] bg-white rounded-2xl p-4 shadow-solid cstm-flex-col justify-start gap-4 border-2 border-accntColor">
      <div
        className="cstm-flex-col w-full bg-prmColor p-2 
                        rounded-md t:w-fit t:px-10 t:mr-auto"
      >
        <p className="font-medium text-white text-sm">{props.label}</p>
      </div>

      <div className="h-full overflow-y-auto cstm-flex-col w-full cstm-scrollbar-2 gap-4 justify-start">
        {props.hasContent ? (
          props.activity
        ) : (
          <div className="cstm-flex-col w-full">
            <Image className="saturate-[.9]" src={noGame} alt="empty" priority width={220} draggable={false} />
            <p className="text-xs opacity-80">{props.noContentMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
