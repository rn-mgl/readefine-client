import React from "react";

const ActivityCard = (props) => {
  return (
    <div className="bg-white w-full h-80 justify-start p-5 rounded-2xl cstm-flex-col gap-5 t:h-[30rem]">
      <div className="cstm-flex-col w-full">
        <p className="text-black font-bold t:text-left w-full">{props.label}</p>
      </div>

      <div className="cstm-flex-col gap-5 w-full overflow-y-auto cstm-scrollbar justify-start">
        {props.activity}
      </div>
    </div>
  );
};

export default ActivityCard;
