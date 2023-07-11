import React from "react";

const ActivityCard = (props) => {
  return (
    <div className="bg-white w-full h-60 justify-start p-5 rounded-2xl cstm-flex-col gap-5 t:w-6/12 t:h-80 overflow-y-auto cstm-scrollbar">
      <p className="text-black font-semibold text-sm">{props.label}</p>

      {props.activity}
    </div>
  );
};

export default ActivityCard;
