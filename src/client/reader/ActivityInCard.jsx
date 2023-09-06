import Image from "next/image";
import React from "react";

const ActivityInCard = (props) => {
  return (
    <div className="cstm-flex-col gap-5 w-full text-center bg-white p-5 rounded-2xl">
      <p className="text-xl font-extrabold t:mr-auto text-prmColor">{props.header}</p>

      <div className="cstm-flex-row gap-5 w-full overflow-x-auto cstm-scrollbar justify-start p-5">
        {props.hasActivities ? (
          props.activities
        ) : (
          <div className="cstm-flex-col w-full">
            <Image src={props.tempImage} alt="empty" priority width={240} draggable={false} />
            <p className="text-xs opacity-80">{props.placeholder}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityInCard;
