import Image from "next/image";
import React from "react";

const ActivityInCard = (props) => {
  return (
    <div className="cstm-flex-col gap-4 w-full text-center bg-white p-4 rounded-2xl">
      <div
        className="cstm-flex-col w-full bg-prmColor p-2 
                        rounded-md t:w-fit t:px-10 t:mr-auto"
      >
        <p className="font-medium text-accntColor text-sm">{props.label}</p>
      </div>

      <div className="cstm-flex-row gap-4 w-full overflow-x-auto cstm-scrollbar-2 justify-start p-4">
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
