import React from "react";

const ActivityCard = (props) => {
  return (
    <div className="bg-white w-full h-60 justify-start p-5 rounded-2xl cstm-flex-col gap-5 t:w-6/12 t:h-80 ">
      <div className="cstm-flex-col w-full p-2">
        <p className="text-black font-semibold text-sm">{props.label}</p>
      </div>

      <div className="cstm-flex-col gap-5 w-full overflow-y-auto cstm-scrollbar justify-start">
        {props.activity}
      </div>
    </div>
  );
};

export default ActivityCard;
