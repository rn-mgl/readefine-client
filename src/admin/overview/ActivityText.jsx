import React from "react";
import { BsDot } from "react-icons/bs";

const ActivityText = (props) => {
  return (
    <div className="cstm-flex-col items-start gap-2 w-full text-sm bg-accntColor p-5 rounded-2xl relative">
      <p className="text-xs font-semibold">{props.dateAdded}</p>
      <div className="cstm-flex-row gap-2 justify-start">
        <div>
          <BsDot className="scale-[2]" />
        </div>

        <p>
          You added <span className="text-prmColor font-bold">{props.addedData}</span>.
        </p>
      </div>
    </div>
  );
};

export default ActivityText;
