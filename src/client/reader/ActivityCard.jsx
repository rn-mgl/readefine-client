import React from "react";

const ActivityCard = (props) => {
  return (
    <div className="w-full h-80 t:h-[30rem] bg-white rounded-2xl p-5 shadow-solid cstm-flex-col justify-start gap-5 border-2 border-accntColor">
      <div className="w-full rounded-2xl">
        <p className="font-bold text-lg text-left">{props.label}</p>
      </div>

      <div className="h-full overflow-y-auto cstm-flex-col w-full cstm-scrollbar gap-5 justify-start">
        {props.activity}
      </div>
    </div>
  );
};

export default ActivityCard;
